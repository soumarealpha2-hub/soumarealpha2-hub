import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

st.set_page_config(page_title='NexusOps', page_icon='◈', layout='wide')

CSS = '''
<style>
.stApp {background: radial-gradient(circle at top left,#111936 0,#070b18 45%,#04060d 100%); color:#eef3ff;}
[data-testid="stSidebar"] {background:#080d1b;border-right:1px solid #1b2a4a;}
.metric-card{background:linear-gradient(145deg,rgba(19,30,59,.95),rgba(8,13,27,.95));border:1px solid #263c68;border-radius:18px;padding:18px;box-shadow:0 14px 34px rgba(0,0,0,.24)}
.kicker{font-size:.75rem;letter-spacing:.16em;color:#80a7ff;text-transform:uppercase}.metric{font-size:2rem;font-weight:800;margin:.2rem 0}.delta-good{color:#6ee7b7}.delta-bad{color:#fca5a5}.subtle{color:#9daecb}.pill{display:inline-block;padding:5px 10px;border-radius:999px;background:#122344;border:1px solid #294d86;margin-right:5px;color:#b9d5ff;font-size:.75rem}
.alert{padding:12px 14px;border-radius:14px;background:#111a30;border-left:4px solid #6b8cff;margin-bottom:10px}.alert-red{border-left-color:#fb7185}.alert-amber{border-left-color:#fbbf24}
h1,h2,h3{letter-spacing:-.02em}.block-container{padding-top:2rem;max-width:1500px}
</style>'''
st.markdown(CSS, unsafe_allow_html=True)

@st.cache_data
def generate_data(seed=42, rows=1800):
    rng = np.random.default_rng(seed)
    dates = pd.date_range('2026-01-01', periods=180, freq='D')
    suppliers = ['Apex Components','Northstar Parts','Vertex Industrial','BlueRiver Supply','MetroWorks']
    regions = ['Northeast','Southeast','Midwest','Southwest','West']
    products = ['Drive Unit','Control Module','Sensor Kit','Power Assembly','Housing']
    df = pd.DataFrame({
        'date': rng.choice(dates, rows),
        'supplier': rng.choice(suppliers, rows, p=[.24,.21,.19,.18,.18]),
        'region': rng.choice(regions, rows),
        'product': rng.choice(products, rows),
        'units': rng.integers(20, 240, rows),
        'unit_cost': rng.normal(42, 8, rows).clip(18, 80),
        'lead_time_days': rng.normal(6.6, 2.1, rows).clip(1, 16),
        'defect_rate': rng.beta(2, 50, rows),
        'inventory_days': rng.normal(31, 10, rows).clip(5, 75),
        'forecast_units': rng.integers(30, 230, rows),
    })
    supplier_penalty = {'Apex Components':0.0,'Northstar Parts':0.6,'Vertex Industrial':1.1,'BlueRiver Supply':2.0,'MetroWorks':0.3}
    df['lead_time_days'] += df['supplier'].map(supplier_penalty)
    delay_prob = (.08 + (df['lead_time_days']-5).clip(lower=0)*.035 + df['supplier'].eq('BlueRiver Supply')*.12).clip(0,.65)
    df['on_time'] = rng.random(rows) > delay_prob
    df['revenue'] = df['units'] * rng.normal(76, 9, rows).clip(48,110)
    df['shipping_cost'] = df['units'] * rng.normal(4.7, 1.4, rows).clip(1.5,10)
    df['total_cost'] = df['units'] * df['unit_cost'] + df['shipping_cost']
    df['margin'] = df['revenue'] - df['total_cost']
    df['fill_rate'] = (1 - np.abs(df['units']-df['forecast_units'])/df['forecast_units']).clip(.45,1)
    return df.sort_values('date')


def fmt_money(x):
    return f'${x/1_000_000:.2f}M' if abs(x)>=1_000_000 else f'${x/1_000:.1f}K'


def metric_card(title, value, delta, good=True, subtitle=''):
    cls='delta-good' if good else 'delta-bad'
    st.markdown(f'''<div class="metric-card"><div class="kicker">{title}</div><div class="metric">{value}</div><div class="{cls}">{delta}</div><div class="subtle">{subtitle}</div></div>''', unsafe_allow_html=True)


df = generate_data()

with st.sidebar:
    st.markdown('## ◈ NEXUSOPS')
    st.caption('Operations Intelligence Platform')
    st.markdown('---')
    min_d, max_d = df.date.min().date(), df.date.max().date()
    dates = st.date_input('Date window', (min_d, max_d), min_value=min_d, max_value=max_d)
    selected_regions = st.multiselect('Regions', sorted(df.region.unique()), default=sorted(df.region.unique()))
    selected_suppliers = st.multiselect('Suppliers', sorted(df.supplier.unique()), default=sorted(df.supplier.unique()))
    st.markdown('---')
    st.markdown('<span class="pill">LIVE MODEL</span><span class="pill">SYNTHETIC DATA</span>', unsafe_allow_html=True)

start, end = dates if isinstance(dates, tuple) and len(dates)==2 else (min_d,max_d)
f = df[(df.date.dt.date>=start)&(df.date.dt.date<=end)&df.region.isin(selected_regions)&df.supplier.isin(selected_suppliers)].copy()

st.markdown('<div class="kicker">OPERATIONS CONTROL TOWER</div>', unsafe_allow_html=True)
st.title('NexusOps')
st.caption('Detect bottlenecks, supplier risk, margin pressure, and service-level issues before they become expensive.')

revenue=f.revenue.sum(); margin=f.margin.sum(); ontime=f.on_time.mean(); fill=f.fill_rate.mean(); avg_lead=f.lead_time_days.mean()
cols=st.columns(5)
with cols[0]: metric_card('Revenue',fmt_money(revenue),'+6.8% vs prior',True,'Selected operating window')
with cols[1]: metric_card('Gross Margin',fmt_money(margin),'+3.1% vs prior',True,f'{margin/revenue:.1%} margin rate')
with cols[2]: metric_card('On-Time Delivery',f'{ontime:.1%}', '-2.4 pts vs target', False,'Target: 95%')
with cols[3]: metric_card('Fill Rate',f'{fill:.1%}', '+1.2 pts vs prior', True,'Demand served')
with cols[4]: metric_card('Avg Lead Time',f'{avg_lead:.1f} days','+0.8 days vs target',False,'Target: < 6.0 days')

st.markdown('### Executive Signal')
left,right=st.columns([2,1])
with left:
    daily=f.groupby('date',as_index=False).agg(revenue=('revenue','sum'),margin=('margin','sum'),on_time=('on_time','mean'))
    fig=go.Figure()
    fig.add_trace(go.Scatter(x=daily.date,y=daily.revenue,name='Revenue',mode='lines',line=dict(width=2)))
    fig.add_trace(go.Scatter(x=daily.date,y=daily.margin,name='Margin',mode='lines',line=dict(width=2)))
    fig.update_layout(height=350,margin=dict(l=0,r=0,t=20,b=0),paper_bgcolor='rgba(0,0,0,0)',plot_bgcolor='rgba(0,0,0,0)',legend=dict(orientation='h'))
    st.plotly_chart(fig,use_container_width=True)
with right:
    supplier=f.groupby('supplier').agg(on_time=('on_time','mean'),lead=('lead_time_days','mean'),defect=('defect_rate','mean'),spend=('total_cost','sum')).reset_index()
    supplier['risk_score']=((1-supplier.on_time)*45 + (supplier.lead/16)*30 + supplier.defect*100*25).clip(0,100)
    worst=supplier.sort_values('risk_score',ascending=False).iloc[0]
    inv_risk=(f.inventory_days<14).mean()
    margin_pressure=(f.margin/f.revenue<.28).mean()
    st.markdown(f'<div class="alert alert-red"><b>Supplier risk:</b> {worst.supplier} has the highest modeled risk score at {worst.risk_score:.0f}/100.</div>',unsafe_allow_html=True)
    st.markdown(f'<div class="alert alert-amber"><b>Inventory exposure:</b> {inv_risk:.1%} of records are below 14 days of inventory coverage.</div>',unsafe_allow_html=True)
    st.markdown(f'<div class="alert"><b>Margin watch:</b> {margin_pressure:.1%} of orders fall below a 28% modeled margin threshold.</div>',unsafe_allow_html=True)

st.markdown('### Supplier Performance Matrix')
supplier['status']=pd.cut(supplier.risk_score,[-1,28,48,100],labels=['Healthy','Watch','Critical'])
fig=px.scatter(supplier,x='lead',y='on_time',size='spend',color='status',hover_name='supplier',text='supplier',labels={'lead':'Average Lead Time (days)','on_time':'On-Time Delivery'},height=420)
fig.update_traces(textposition='top center')
fig.update_layout(margin=dict(l=0,r=0,t=30,b=0),paper_bgcolor='rgba(0,0,0,0)',plot_bgcolor='rgba(0,0,0,0)')
st.plotly_chart(fig,use_container_width=True)

c1,c2=st.columns(2)
with c1:
    st.markdown('### Inventory Risk')
    inv=f.groupby('product',as_index=False).agg(inventory_days=('inventory_days','mean'),units=('units','sum'),fill_rate=('fill_rate','mean'))
    fig=px.bar(inv.sort_values('inventory_days'),x='inventory_days',y='product',orientation='h',text_auto='.1f',height=360,labels={'inventory_days':'Days of Inventory','product':''})
    fig.add_vline(x=14,line_dash='dash',annotation_text='Risk threshold')
    fig.update_layout(margin=dict(l=0,r=0,t=20,b=0),paper_bgcolor='rgba(0,0,0,0)',plot_bgcolor='rgba(0,0,0,0)')
    st.plotly_chart(fig,use_container_width=True)
with c2:
    st.markdown('### Regional Service Levels')
    reg=f.groupby('region',as_index=False).agg(on_time=('on_time','mean'),fill_rate=('fill_rate','mean'),margin=('margin','sum'))
    reg_long=reg.melt(id_vars='region',value_vars=['on_time','fill_rate'],var_name='metric',value_name='rate')
    fig=px.bar(reg_long,x='region',y='rate',color='metric',barmode='group',height=360,range_y=[0,1])
    fig.update_layout(margin=dict(l=0,r=0,t=20,b=0),paper_bgcolor='rgba(0,0,0,0)',plot_bgcolor='rgba(0,0,0,0)')
    st.plotly_chart(fig,use_container_width=True)

st.markdown('### Scenario Lab')
s1,s2,s3=st.columns(3)
with s1: demand=st.slider('Demand change',-20,40,15,5)
with s2: lead_shock=st.slider('Lead-time shock (days)',0,8,2)
with s3: supplier_fail=st.selectbox('Supplier disruption',['None']+sorted(f.supplier.unique().tolist()))

base_cost=f.total_cost.sum(); base_units=f.units.sum(); base_fill=fill
scenario_units=base_units*(1+demand/100)
scenario_cost=base_cost*(1+demand/100)*(1+lead_shock*.012)
scenario_fill=max(.45,base_fill - max(demand,0)*.0025 - lead_shock*.015)
if supplier_fail!='None':
    share=f.loc[f.supplier.eq(supplier_fail),'units'].sum()/base_units
    scenario_fill=max(.35,scenario_fill-share*.45)
    scenario_cost*=1+share*.08
sc=st.columns(3)
with sc[0]: metric_card('Projected Throughput',f'{scenario_units:,.0f} units',f'{demand:+d}% demand assumption',demand>=0,'Scenario output')
with sc[1]: metric_card('Projected Cost',fmt_money(scenario_cost),f'{(scenario_cost/base_cost-1):+.1%} vs baseline',scenario_cost<=base_cost,'Includes disruption premium')
with sc[2]: metric_card('Projected Fill Rate',f'{scenario_fill:.1%}',f'{scenario_fill-base_fill:+.1%} vs baseline',scenario_fill>=base_fill,'Modeled service impact')

st.markdown('### Operations Analyst Copilot')
question=st.text_input('Ask a business question',placeholder='Example: Which supplier is creating the most operational risk?')
if question:
    q=question.lower()
    if 'supplier' in q or 'risk' in q:
        row=supplier.sort_values('risk_score',ascending=False).iloc[0]
        answer=f"{row.supplier} is the priority supplier to investigate. Its modeled risk score is {row.risk_score:.0f}/100, driven by {row.on_time:.1%} on-time delivery and {row.lead:.1f}-day average lead time. Recommended action: review open POs, expedite critical SKUs, and qualify a backup source."
    elif 'margin' in q or 'cost' in q:
        prod=f.groupby('product').agg(margin=('margin','sum'),revenue=('revenue','sum')).assign(rate=lambda x:x.margin/x.revenue).sort_values('rate').iloc[0]
        answer=f"The lowest-margin product family is {prod.name} at {prod.rate:.1%}. Investigate unit-cost variance, freight spend, and supplier mix before changing pricing or volume allocation."
    elif 'inventory' in q or 'stock' in q:
        row=inv.sort_values('inventory_days').iloc[0]
        answer=f"{row['product']} has the lowest average coverage at {row.inventory_days:.1f} inventory days. That makes it the first item to review for stockout exposure, especially if demand increases or lead times slip."
    else:
        answer=f"Across the selected window, on-time delivery is {ontime:.1%}, fill rate is {fill:.1%}, and average lead time is {avg_lead:.1f} days. The strongest next analysis is to segment performance by supplier and product to isolate the operational driver."
    st.success(answer)

with st.expander('View filtered operations data'):
    st.dataframe(f[['date','supplier','region','product','units','lead_time_days','on_time','fill_rate','inventory_days','revenue','total_cost','margin']],use_container_width=True,height=320)

st.caption('NexusOps is a portfolio demonstration built with synthetic data. Recommendations are analytical signals, not production decisions.')
