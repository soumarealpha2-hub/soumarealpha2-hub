import math
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

st.set_page_config(page_title="StratForge", page_icon="◆", layout="wide")

st.markdown("""
<style>
.stApp {background: radial-gradient(circle at top right,#17203f 0,#090d1a 42%,#05070d 100%); color:#eef3ff;}
[data-testid="stSidebar"] {background:#080c16;border-right:1px solid #1f2b47;}
.block-container{padding-top:1.8rem;max-width:1500px}.card{background:linear-gradient(145deg,rgba(19,28,52,.96),rgba(8,12,24,.96));border:1px solid #263758;border-radius:18px;padding:18px;box-shadow:0 16px 34px rgba(0,0,0,.22)}
.kicker{font-size:.75rem;letter-spacing:.15em;color:#91b4ff;text-transform:uppercase}.big{font-size:1.9rem;font-weight:800;margin:.2rem 0}.muted{color:#a7b6d0}.good{color:#77e3b5}.warn{color:#ffd166}.bad{color:#ff8fa3}
.tag{display:inline-block;padding:5px 10px;border-radius:999px;background:#132141;border:1px solid #2d4d80;margin:2px 4px 2px 0;color:#bfd6ff;font-size:.75rem}.insight{padding:12px 14px;border-radius:14px;background:#111a2e;border-left:4px solid #7aa2ff;margin-bottom:10px}h1,h2,h3{letter-spacing:-.02em}
</style>
""", unsafe_allow_html=True)

def money(x):
    if abs(x) >= 1_000_000_000: return f"${x/1_000_000_000:.2f}B"
    if abs(x) >= 1_000_000: return f"${x/1_000_000:.1f}M"
    if abs(x) >= 1_000: return f"${x/1_000:.1f}K"
    return f"${x:,.0f}"

def card(label, value, note, tone="good"):
    st.markdown(f'<div class="card"><div class="kicker">{label}</div><div class="big">{value}</div><div class="{tone}">{note}</div></div>', unsafe_allow_html=True)

@st.cache_data
def base_case():
    markets = pd.DataFrame({"Market":["New York","Boston","Chicago","Atlanta","Dallas","Los Angeles"],"Customers_m":[8.7,3.9,6.2,5.1,7.0,9.4],"Growth":[.084,.061,.049,.092,.088,.073],"Avg_Spend":[520,470,430,390,410,560],"Competition":[8.7,7.3,6.2,5.8,6.4,8.4],"Entry_Cost_m":[34,21,24,18,20,39],"Margin_Potential":[.31,.29,.27,.33,.32,.30]})
    markets["TAM"] = markets["Customers_m"]*1_000_000*markets["Avg_Spend"]
    markets["Attractiveness"] = markets["Growth"]*100*.30 + markets["Margin_Potential"]*100*.30 + (10-markets["Competition"])*.25 + (45-markets["Entry_Cost_m"])/4*.15
    competitors = pd.DataFrame({"Company":["NorthPeak","Vertex Co.","SignalOne","UrbanCore","NovaEdge"],"Market Share":[.26,.22,.18,.15,.09],"Price Index":[108,96,102,91,116],"NPS":[54,47,61,43,66],"Digital Strength":[8.3,6.4,9.0,5.7,8.8],"Cost Position":[6.1,7.8,6.9,8.4,5.8]})
    return markets, competitors

markets, competitors = base_case()
with st.sidebar:
    st.markdown("## ◆ STRATFORGE")
    st.caption("Strategy & Consulting Decision Lab")
    st.markdown("---")
    industry = st.selectbox("Case industry", ["Consumer Services","B2B Software","Logistics","FinTech","Retail"])
    client = st.text_input("Client name", value="Apex Growth Co.")
    objective = st.selectbox("Primary objective", ["Market Entry","Profitability Improvement","Growth Strategy","Competitive Response"])
    st.markdown("---")
    st.markdown('<span class="tag">SYNTHETIC CASE</span><span class="tag">INTERACTIVE</span>', unsafe_allow_html=True)

st.markdown('<div class="kicker">CONSULTING WORKBENCH</div>', unsafe_allow_html=True)
st.title("StratForge")
st.caption("Turn an ambiguous business problem into a structured recommendation, quantified upside, and executive-ready story.")
revenue=420_000_000; operating_profit=48_300_000; margin=operating_profit/revenue; market_growth=markets["Growth"].mean(); weighted_score=markets["Attractiveness"].max()
for col,args in zip(st.columns(4),[("Client Revenue",money(revenue),"+7.4% YoY","good"),("Operating Margin",f"{margin:.1%}","2.6 pts below benchmark","warn"),("Avg Market Growth",f"{market_growth:.1%}","Growth remains attractive","good"),("Best Market Score",f"{weighted_score:.1f}/10","Prioritize focused diligence","good")]):
    with col: card(*args)

st.markdown("### 1. Issue Tree")
for col,title,q,body in zip(st.columns(3),["GROWTH","ECONOMICS","EXECUTION"],["Where to play?","How to win?","Can we deliver?"],["Market size · segment growth · customer needs · geography · channel","Pricing · unit economics · cost-to-serve · operating model · investment","Capabilities · timing · risks · dependencies · change management"]):
    with col: st.markdown(f'<div class="card"><div class="kicker">{title}</div><div class="big">{q}</div><div class="muted">{body}</div></div>', unsafe_allow_html=True)

st.markdown("### 2. Market Entry Prioritization")
w=st.columns(4)
with w[0]: growth_w=st.slider("Growth weight",0,50,30,5)
with w[1]: margin_w=st.slider("Margin weight",0,50,30,5)
with w[2]: comp_w=st.slider("Competition weight",0,50,25,5)
with w[3]: cost_w=st.slider("Entry-cost weight",0,50,15,5)
total_w=max(growth_w+margin_w+comp_w+cost_w,1)
ranked=markets.copy(); ranked["Score"]=(ranked["Growth"]*100*growth_w+ranked["Margin_Potential"]*100*margin_w+(10-ranked["Competition"])*comp_w+(45-ranked["Entry_Cost_m"])/4*cost_w)/total_w; ranked=ranked.sort_values("Score",ascending=False)
left,right=st.columns([1.45,1])
with left:
    fig=px.scatter(ranked,x="Competition",y="Growth",size="TAM",color="Score",hover_name="Market",text="Market",height=430,labels={"Competition":"Competitive Intensity","Growth":"Market Growth"}); fig.update_traces(textposition="top center"); fig.update_layout(margin=dict(l=0,r=0,t=25,b=0),paper_bgcolor="rgba(0,0,0,0)",plot_bgcolor="rgba(0,0,0,0)"); st.plotly_chart(fig,use_container_width=True)
with right:
    top=ranked.iloc[0]; st.markdown(f'<div class="insight"><b>Priority market:</b> {top.Market} leads with a score of {top.Score:.1f}, {top.Growth:.1%} growth, and {top.Margin_Potential:.1%} margin potential.</div>',unsafe_allow_html=True); st.dataframe(ranked[["Market","Growth","Margin_Potential","Competition","Entry_Cost_m","Score"]],hide_index=True,use_container_width=True)

st.markdown("### 3. Profitability Diagnostic")
rev_change=st.slider("Revenue growth assumption",-10,30,8,1); price_change=st.slider("Pricing change",-5,15,3,1); volume_change=st.slider("Volume change",-15,25,5,1); variable_cost_change=st.slider("Variable cost change",-15,15,-4,1); fixed_cost_change=st.slider("Fixed cost change",-10,20,2,1)
base_price_revenue=revenue*.55; base_volume_revenue=revenue*.45; base_variable_cost=revenue*.63; base_fixed_cost=revenue*.255
new_revenue=(base_price_revenue*(1+price_change/100)+base_volume_revenue*(1+volume_change/100))*(1+rev_change/100); new_variable=base_variable_cost*(1+variable_cost_change/100)*(new_revenue/revenue); new_fixed=base_fixed_cost*(1+fixed_cost_change/100); new_profit=new_revenue-new_variable-new_fixed; new_margin=new_profit/new_revenue
for col,args in zip(st.columns(3),[("Scenario Revenue",money(new_revenue),f"{new_revenue/revenue-1:+.1%} vs baseline","good" if new_revenue>=revenue else "bad"),("Scenario Profit",money(new_profit),f"{new_profit/operating_profit-1:+.1%} vs baseline","good" if new_profit>=operating_profit else "bad"),("Scenario Margin",f"{new_margin:.1%}",f"{new_margin-margin:+.1%} vs baseline","good" if new_margin>=margin else "bad")]):
    with col: card(*args)
bridge=pd.DataFrame({"Driver":["Baseline Profit","Revenue / Mix","Variable Cost","Fixed Cost","Scenario Profit"],"Value":[operating_profit,new_revenue-revenue,-(new_variable-base_variable_cost),-(new_fixed-base_fixed_cost),new_profit],"Measure":["absolute","relative","relative","relative","total"]})
fig=go.Figure(go.Waterfall(x=bridge["Driver"],y=bridge["Value"],measure=bridge["Measure"],connector={"line":{"width":1}})); fig.update_layout(height=390,margin=dict(l=0,r=0,t=20,b=0),paper_bgcolor="rgba(0,0,0,0)",plot_bgcolor="rgba(0,0,0,0)",yaxis_tickprefix="$"); st.plotly_chart(fig,use_container_width=True)

st.markdown("### 4. Competitive Positioning")
fig=px.scatter(competitors,x="Price Index",y="NPS",size="Market Share",color="Digital Strength",text="Company",hover_data=["Cost Position"],height=420); fig.add_vline(x=100,line_dash="dash"); fig.add_hline(y=55,line_dash="dash"); fig.update_traces(textposition="top center"); fig.update_layout(margin=dict(l=0,r=0,t=20,b=0),paper_bgcolor="rgba(0,0,0,0)",plot_bgcolor="rgba(0,0,0,0)"); st.plotly_chart(fig,use_container_width=True)

st.markdown("### 5. Scenario Room")
sc=st.columns(3)
with sc[0]: capture=st.slider("Target market share",1,20,7,1)
with sc[1]: launch_cost=st.slider("Launch investment ($M)",5,60,22,1)
with sc[2]: realization=st.slider("Benefit realization",40,100,75,5)
chosen=ranked.iloc[0]; market_revenue=chosen["TAM"]; annual_revenue=market_revenue*capture/100; annual_profit=annual_revenue*chosen["Margin_Potential"]*realization/100; payback=launch_cost*1_000_000/annual_profit if annual_profit>0 else math.inf; three_year_value=annual_profit*3-launch_cost*1_000_000
for col,args in zip(st.columns(3),[("Year-1 Revenue",money(annual_revenue),f"At {capture}% share","good"),("Annual Profit",money(annual_profit),f"{realization}% realization","good"),("Payback",f"{payback:.1f} years",money(three_year_value)+" 3-year value","good" if payback<=2 else "warn")]):
    with col: card(*args)

st.markdown("### 6. Executive Recommendation")
recommendation=f"Prioritize {chosen['Market']} as the first expansion market. It combines {chosen['Growth']:.1%} growth, {chosen['Margin_Potential']:.1%} margin potential, and an estimated {money(market_revenue)} addressable market. Under the current scenario, a {capture}% share could generate approximately {money(annual_revenue)} in annual revenue and {money(annual_profit)} in annual operating profit, with a {payback:.1f}-year payback. Sequence the recommendation in three moves: validate customer willingness to pay, secure the minimum operating capabilities required for launch, and stage investment against measurable demand milestones."
st.success(recommendation)
with st.expander("Board-style recommendation memo"):
    st.markdown(f"**Client:** {client}  \n**Industry:** {industry}  \n**Objective:** {objective}\n\n**Situation**  \nThe client is pursuing growth while operating below its target profitability level.\n\n**Complication**  \nNot every market offers the same combination of growth, margin, competitive intensity, and entry cost, while aggressive expansion could dilute economics.\n\n**Recommendation**  \n{recommendation}\n\n**Key risks**  \n1. Customer acquisition costs exceed plan.  \n2. Competitors respond with pricing or promotions.  \n3. Required operating capabilities take longer to build than expected.  \n4. Modeled market share does not materialize.\n\n**Next 30 days**  \nConduct customer research, validate pricing, pressure-test market-share assumptions, and define a stage-gated launch plan with explicit investment triggers.")
st.caption("StratForge uses synthetic case data for portfolio demonstration. It is designed to showcase structured problem solving, quantitative analysis, scenario thinking, and executive communication.")