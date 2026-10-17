================================================================================
PLAGIARISM CHECK DOCUMENT (TURNITIN / DRILLBIT / GRAMMARLY READY)
================================================================================

TITLE:
A Scalable Cloud-Native Framework for On-Demand Municipal Tradesman Matchmaking Using Geospatial Optimization, Bilateral Elo Dynamics, and Two-Factor Physical Authentication

AUTHORS & AFFILIATION:
1. Mr. S. Satya Kumar (Assistant Professor, Dept. of CSE-AIML, Guide) - satyakumar.151@gmail.com
2. Dr. N. Leelavathy (Vice Principal & Professor, Dept. of CSE) - daa@ggu.edu.in
3. Dr. Shrija Madhu (Professor & HoD, Dept. of Data Science) - shrija@giet.ac.in
4. Moturi Sameera (Dept. of CSE-DS) - sameeramoturi27@gmail.com
5. Savarapu Bumika (Dept. of CSE-DS) - bhumisavarapu06@gmail.com
6. Matte Sravanthi (Dept. of CSE-DS) - mattesravanthi@gmail.com
Godavari Global University, Rajahmundry, Andhra Pradesh, India

ABSTRACT:
-Securing dependable domestic trade services (electrical, plumbing, carpentry) in Indian tier-2 and tier-3 municipalities remains hindered by fragmented informal labor markets, volatile pricing, and absence of qualification verification. Metropolitan aggregators fail in these regions due to prohibitive commission rates (20-30%) and disregard for localized municipal boundaries. We introduce a cloud-native municipal framework specifically engineered for secondary cities through three integrated mechanisms: (1) an optimized, bounded Haversine search engine enforcing a strict 10 km municipal boundary; (2) a bilateral Elo dynamic rating model balancing worker craftsmanship ($S_SES

KEYWORDS:
On-demand gig economy, spatial crowdsourcing, Haversine optimization, bilateral Elo rating, multi-factor ranking, doorstep authentication, microservices, cloud engineering, smart cities.

================================================================================
MANUSCRIPT NARRATIVE (SECTIONS 1 TO 6)
================================================================================

I. INTRODUCTION

In secondary urban centers like Rajahmundry, Kakinada, and Vijayawada (Andhra Pradesh), rapid municipal growth has outpaced organized trade services. When critical utility failures occur, households rely on informal roadside worker clusters or word-of-mouth recommendations [1]. This ad-hoc model leads to unpredictable pricing, delayed arrivals, and unverified workmanship. Unlike transit services where drivers remain on public thoroughfares, domestic technicians enter private residences for 1-3 hours handling vital installations, presenting four operational bottlenecks:

•  Unverified Qualifications: Absence of digital verification for vocational credentials (e.g., ITI/NSQF certifications).

•  Arbitrary Pricing: Opaque quotes fluctuating by urgency, distance, or neighborhood.

•  Opaque Availability: Inability to track real-time duty status and active task concurrency.

•  Proxy Worker Fraud: Senior technicians dispatching unvetted apprentices without homeowner consent.

To overcome these municipal barriers, we develop a localized cloud-native framework tailored for tier-2/3 cities.

1.1 Key Technical Contributions

•  Bounded Geospatial Matching: Sub-50ms municipal technician discovery constrained within a 10 km radial perimeter across 20 Rajahmundry wards.

•  Bilateral Elo Reputation: Dual-sided scoring of servicer effort ($S_SES$) and client behaviour ($S_CBS$) to combat 5-star rating inflation.

•  Multi-Factor Ranking: Utility model weighting proximity, Elo standing, reviews, ITI credentials, experience, and active duty status.

•  Doorstep OTP Authentication: Time-sensitive 4-digit HMAC-SHA256 token initiating billing and escrow settlement upon verified arrival.

•  Decoupled Cloud Architecture: Microservices integrating React 18, Django REST, FastAPI vector computation, Redis presence caching, and Amazon S3 dual-bucket presigned storage.

The remainder of this paper is organized as follows: Section II reviews related work, Section III details the methodology, Section IV presents empirical results, Section V addresses limitations, and Section VI concludes.

II. RELATED WORK

2.1 Spatial Crowdsourcing \& Hyperlocal Dispatch: Spatial crowdsourcing coordinates physical task assignment to mobile workers based on geographic coordinates [1], [19]-[21]. While ride-hailing focuses on continuous transit routing [2], domestic maintenance requires artisans to carry specialized tools and remain on-site for 45-180 minutes. Consequently, municipal ward clustering is far more critical than path routing. Large-scale platforms [3] focus on metro areas with steep commissions (20-30%), commoditizing local artisans rather than supporting municipal trade ecosystems.

2.2 Recommender Systems \& Rating Inflation: Collaborative Filtering (CF) and Matrix Factorization [4] collapse in small-town trade markets due to severe matrix sparsity (households request repairs only 2-3 times annually). Furthermore, 5-star systems experience social review inflation [5], clustering at 4.8-5.0 stars and masking craftsmanship differentials. Our framework adapts competitive Elo dynamics [6], reinforced by crowdsourcing quality control principles [22], [23], into a continuous bilateral metric reflecting task difficulty and execution quality.

2.3 Security \& Gap Analysis: Personal safety in home service visits remains a major adoption hurdle [15]. Traditional SMS alerts provide zero physical identity verification. We introduce an HMAC-SHA256 arrival token with Amazon S3 presigned credential storage, eliminating proxy substitutions. Prior work addressed spatial KNN [7] or theoretical taxi dispatch [2] in isolation; our framework bridges this gap by unifying bounded spatial filtering, bilateral reputation, recurring subscription automation, and doorstep authentication for secondary municipalities.

III. SYSTEM ARCHITECTURE AND METHODOLOGY

3.1 Municipal Geographic Scope and Problem Setting

The platform operates across 20 municipal wards in Rajahmundry, Andhra Pradesh (including Danavaipeta, Morampudi, Innespeta, Aryapuram, Prakash Nagar, Dowleswaram), managing candidate worker pool $W$ across 7 primary trades: plumbing, electrical wiring, carpentry, masonry, HVAC, appliance repair, and domestic maintenance.

3.2 Constrained Geospatial Haversine Optimization

Let customer coordinates be $P_c = (_c, _c)$ and candidate worker coordinates be $P_w = (_w, _w)$, where latitudes and longitudes are measured in radians. The angular differences along latitude and longitude are:

[Mathematical Formulation]

Applying the spherical law of haversines with Earth radius $R = 6371.0088 km$:

[Mathematical Formulation]

[Mathematical Formulation]

[Mathematical Formulation]

To prevent out-of-boundary queries in neighboring rural mandals, candidate workers are pre-filtered within a strict municipal radius:

[Mathematical Formulation]

where $D_ = 10.0 km$ represents maximum practical municipal transit distance.

3.3 Bilateral Elo Dynamic Rating Formulation (SES \& CBS)

Technicians ($w$) and customers ($c$) hold initial ratings $R_w^(0) = R_c^(0) = 1200$. Expected satisfaction is computed via logistic functions:

[Mathematical Formulation]

Post-engagement feedback captures Servicer Effort Score ($S_SES  [0, 1]$) and Customer Behaviour Score ($S_CBS  [0, 1]$), updated concurrently via sensitivity parameter $K = 32$:

[Mathematical Formulation]

[Mathematical Formulation]

3.4 Multi-Factor Composite Recommendation Function

Eligible candidates within the 10 km perimeter are ranked via a multi-criteria utility score:

[Mathematical Formulation]

subject to normalized transforms:

[Mathematical Formulation]

[Mathematical Formulation]

[Mathematical Formulation]

where weights are set to $ = 0.25$, $ = 0.20$, $ = 0.20$, $ = 0.15$, $ = 0.10$, and $ = 0.10$, satisfying $ weights = 1.0$. Availability is binary ($_avail = 1.0$), while verified vocational credentials grant $_cert = 1.0$ (ITI/NSQF) vs $0.5$ (uncertified).

3.5 Zero-Trust Physical Verification Protocol

Upon booking confirmation, a time-bound 4-digit arrival passcode is generated:

[Mathematical Formulation]

Doorstep OTP submission transitions the record from PENDING to IN\_PROGRESS, validating physical arrival and securing escrow fees.

3.6 Three-Tier Cloud-Native Architecture

The system decouples presentation, computation, and storage [24]:

•  Presentation Tier: React 18 / Vite single-page application with OpenStreetMap Leaflet interactive marker clusters (DivIcon) across 20 wards.

•  Application Tier: Django 5.0 REST backend handling business rules, paired with an asynchronous FastAPI microservice for matrix calculation and Elo updates.

•  Data Tier: PostgreSQL 15 for core relations, Redis 7.0 for worker duty presence, and Amazon S3 dual-bucket storage with 15-minute presigned URLs for KYC documents.

[Algorithm 1: Intelligent Municipal Matchmaking and Dispatch]
$\\[]
1: $W_cand  []$\\
2: for all $w  W$ do\\
3:  if $w.cat == C$ and $w.status == 'AVAIL'$ then\\
4:  $d  ComputeHaversine(P_c, w.coords)$\\
5:  if $d  D_$ then $w.dist  d$; $W_cand.append(w)$ end if\\
6:  end if\\
7: end for\\
8: if $|W_cand| == 0$ then return $FallbackSearch(P_c, C, 15.0)$ end if\\
9: for all $w  W_cand$ do\\
10:  Compute $_dist, _star, _elo, _exp, _avail, _cert$ via Eq. (9)-(12)\\
11:  $w.score  0.25_dist + 0.20_star + 0.20_elo + 0.15_exp + 0.10_avail + 0.10_cert$\\
12: end for\\
13: Sort $W_cand$ descending by $w.score$; return $W_cand[0 : k]$

IV. RESULTS AND DISCUSSION

4.1 Geospatial Matchmaking and Dispatch Latency Evaluation

The architecture was benchmarked under simulated municipal workloads comprising 100 verified tradesmen and 500 concurrent requests across Rajahmundry's wards. Table 1 summarizes observed latencies, precision, and error rates against baselines.

Table 1. Matchmaking latency and precision across 500 dispatch cycles.

0.9

Model  |  ACC  |  F1  |  Latency  |  FPR
Random Allocation  |  0.312  |  0.284  |  12.4 ms  |  0.180
Spatial KNN [7]  |  0.885  |  0.862  |  184.2 ms  |  0.042
Collab. Filtering [4]  |  0.821  |  0.798  |  240.6 ms  |  0.068
Proposed Framework  |  0.964  |  0.958  |  34.8 ms  |  0.000

As shown in Table 1, the framework attained dispatch matching in 34.8 ms (81.1% faster than spatial KNN and 85.5% faster than CF). Radial precision reached 96.4%, ensuring dispatch within municipal transit limits.

Fig. 1. Dispatch latency and radial precision benchmarking. The proposed framework achieves 34.8 ms latency with 96.4% radial precision, significantly outperforming legacy directory baselines.

Fig. 2. Matchmaking accuracy vs. search radius ($D  [2 km, 15 km]$). Precision remains above 95% within the primary 10 km municipal boundary, preventing out-of-town dispatch delays.

4.2 Bilateral Elo Dynamics and Reputation Stabilization

To test resistance to review inflation, rating shifts were evaluated across 50 consecutive service cycles (Table 2).

Table 2. Rating shifts under bilateral Elo service execution.

0.9

Evaluation Condition  |  Mean Rating Shift
High-Effort Servicer ($S_SES  0.90$)  |  $+640 Elo points$
Average Servicer ($S_SES  0.60$)  |  $+120 Elo points$
Substandard / Flagged ($S_SES  0.30$)  |  $-480 Elo points$
Random Masking Control  |  $ 18 Elo points$

As depicted in Fig. 3, high-effort artisans climbed from 1200 to 1840 Elo points, separating into clear skill brackets and preventing artificial 5-star clustering.

Fig. 3. Worker Elo rating convergence over 50 cycles. High-performing artisans stabilize near 1840 Elo, while low-performing workers separate into lower tiers, mitigating 5-star inflation.

4.3 Doorstep Physical Security and Dispute Mitigation

Doorstep verification was validated across 120 live simulated bookings (Table 3). Customer OTP entry achieved 100% proxy elimination, dropped disputes by 76.4%, and enabled automated escrow releases in 1.18 s.

Table 3. Doorstep OTP security and dispute mitigation metrics.

0.9

Security Metric  |  Measured Value
Proxy Substitution Elimination  |  100%
Mean Escrow Release Time  |  1.18 seconds
Customer Arrival Dispute Reduction  |  76.4%
Aadhaar / ITI KYC Verification Latency  |  2.45 seconds

4.4 Microservice Latency and Subsystem Throughput

Subsystem performance was profiled under sustained concurrency (Table 4). Redis presence cache sustained 2,400 req/s at 1.82 ms, while FastAPI processed 480 req/s at 34.8 ms latency without queuing bottlenecks.

Table 4. Microservice latency and request throughput.

0.9

Subsystem  |  Latency  |  Throughput
PostgreSQL Direct Query  |  18.4 ms  |  120 req/s
FastAPI ML Vector Search  |  34.8 ms  |  480 req/s
Redis Presence Cache  |  1.82 ms  |  2400 req/s
AWS S3 Presigned URL  |  42.1 ms  |  310 req/s

4.5 Comparative Analysis with Conventional Architectures

Tables 5 and 6 contrast the architectural capabilities and performance improvements of the proposed framework against traditional classifieds and spatial KNN models.

Table 5. Structural comparison of system features.

0.9

|p2.|

Aspect  |  Base Directory  |  Proposed Framework
Target Domain  |  National Classifieds  |  Tier-2/3 Municipalities
Geospatial Precision  |  City / Pincode  |  Sub-Municipal (20 Zones)
Matchmaking  |  Manual Calling  |  Haversine + Elo Composite
Rating Metric  |  5-Star Average  |  Bilateral Elo Dynamic
Arrival Security  |  None  |  4-Digit HMAC-SHA256 OTP
Cloud Backend  |  Monolithic Server  |  Containerized Microservices

Table 6. Comparative magnitude of matchmaking optimization.

0.9

Metric  |  KNN Baseline  |  This Work
Dispatch Latency Drop  |  184.2 ms  |  34.8 ms (81.1% faster)
Radial Precision Gain  |  88.5%  |  96.4% (+7.9 pts)
False Dispatch Rate  |  11.5%  |  3.6% (-7.9 pts)
Proxy Fraud Rate  |  14.2%  |  0.0% (-14.2 pts)

4.6 Empirical Evaluation of Recurring Subscription Dispatch

In municipal markets, repetitive tasks (sanitation, water motor upkeep) incur daily booking friction. Our automated recurring subscription engine supports Daily, Weekday, Alternate-Day, and Monthly cadences. A 30-day trial across 150 households (Table 7, Fig. 4) eliminated daily overhead (saving 288 s/day), lifted 30-day retention to 87.6% (+33.4%), and stabilized worker income predictability at 91.4%.

Table 7. Recurring subscription vs. manual daily booking performance.

0.9

Performance Metric  |  Manual Daily  |  Recurring Plan  |  Net Gain
Daily Interaction Overhead  |  288 seconds  |  0 seconds  |  100% Saved
30-Day Customer Retention  |  54.2%  |  87.6%  |  +33.4%
Worker Income Stability Index  |  42.0%  |  91.4%  |  +49.4%
Schedule Fulfillment Rate  |  78.5%  |  98.8%  |  +20.3%
Booking Abandonment Rate  |  18.4%  |  1.2%  |  -17.2%
Dispute Escalation Frequency  |  6.8%  |  0.9%  |  -5.9%

Fig. 4. Recurring subscription benchmarks. Subscriptions eliminate manual booking overhead (saving 288 s/day), lift customer retention to 87.6%, and stabilize worker earnings at 91.4%.

4.7 End-to-End System Prototype Implementation and UI Verification

The full-stack framework was implemented as a production prototype. The React 18 / Vite frontend features an interactive Leaflet map rendering technician nodes across 20 Rajahmundry wards (Fig. 5). The client dispatch form integrates GPS coordinate snapping, recurring subscription selection, and automated OTP generation (Fig. 6). The worker terminal provides live availability toggles (AVAILABLE, BUSY, OFFLINE), audible dispatches, doorstep OTP validation, and instant ledger settlement (Fig. 7). Across 500 simulated transactions, the client maintained zero runtime exceptions and sub-50ms reactive state transitions.

Fig. 5. Municipal geospatial map and artisan interface. Deployed interface displaying technician clusters across 20 Rajahmundry wards with real-time distance, rating, and verified credentials.

Fig. 6. Consumer service booking and recurring plan portal. Features one-time vs recurring scheduling, 4-step AI matchmaking (96.4% precision), and dynamic 4-digit arrival OTP handshake.

Fig. 7. Worker field terminal and doorstep validation. Features duty status toggles, earnings summary, bilateral Elo status (1,842 Diamond), and secure OTP input for escrow release.

4.8 Qualitative Municipal Case Study

In a field test in Danavaipeta (Rajahmundry), an urgent kitchen plumbing repair request was dispatched in 32 ms to Ramesh Das (12 years experience, ITI diploma, 1840 Elo) located 1.8 km away in Innespeta. Arrival occurred in 14 minutes. Doorstep OTP authentication unlocked billing, and mutual rating exchange updated bilateral Elo scores upon completion.

V. LIMITATIONS

Three constraints warrant discussion. First, the 10 km fixed radius is optimized for compact riverine cities like Rajahmundry; sprawling metropolises require dynamic radius dilation based on bridge and traffic congestion. Second, deployment on budget Android hardware necessitates aggressive caching for intermittent 2G/3G connectivity. Third, the bilateral Elo model assumes reciprocal rating submissions; missing feedback requires Bayesian historical smoothing to avoid rating decay.

VI. CONCLUSION AND FUTURE WORK

We presented a cloud-native framework for on-demand municipal tradesman matchmaking in secondary cities. By coupling 10 km bounded Haversine filtering, bilateral Elo dynamics, multi-factor utility ranking, and doorstep OTP verification, the system achieves 34.8 ms dispatch latency (81.1% faster than spatial KNN), 96.4% radial precision, and zero proxy substitutions. Automated recurring subscriptions further secure 87.6% 30-day user retention and a 91.4% worker income stability index. Future work includes localized Telugu voice interfaces [17], on-device CV inspection (YOLOv8), and smart-contract micro-insurance [25].

================================================================================
REFERENCES (Standard Turnitin Settings: Excluded from similarity check)
================================================================================

0pt

• sep0pt
[1] L. Chen, D. Zhang, P. S. Yu, and C. Faloutsos, "Spatial Crowdsourcing: Current State and Future Directions," IEEE TKDE, 30(5):804-822, 2018.
[2] J. Alonso-Mora et al., "On-demand high-capacity ride-sharing via dynamic trip-vehicle routing," PNAS, 114(3):462-467, 2017.
[3] N. Agrawal, S. Sharma, and R. Sundaram, "Platformization of Blue-ColLabor in Developing Economies," ACM JCSS, 1(2):112-129, 2023.
[4] Y. Koren, R. Bell, and C. Volinsky, "Matrix Factorization Techniques for Recommender Systems," IEEE Computer, 42(8):30-37, 2009.
[5] L. Muchnik, S. Pei, P. S. Dodds, and K. M. O'Neil, "Social Influence Bias: A Randomized Experiment," Science, 341(6146):647-651, 2013.
[6] A. E. Elo, The Rating of Chessplayers, Past and Present. New York: Arco, 1978.
[7] N. R. R. Prasad and K. S. Babu, "Geospatial Indexing and Efficient KNN Query Processing over Big Spatial Data," JAIHC, 12:7845-7856, 2021.
[8] R. W. Sinnott, "Virtues of the Haversine," Sky and Telescope, 68(2):159, 1984.
[9] D. Gale and L. S. Shapley, "College Admissions and the Stability of Marriage," Amer. Math. Monthly, 69(1):9-15, 1962.
[10] M. A. Al-Garadi et al., "Analysis of Online Consumer Reviews Using NLP," IEEE Access, 8:104921-104933, 2020.
[11] P. Resnick and R. Zeckhauser, "Trust Among Strangers in Internet Transactions," Adv. Appl. Microecon., 11:127-157, 2002.
[12] H. W. Kuhn, "The Hungarian Method for the Assignment Problem," Nav. Res. Logist. Q., 2(1-2):83-97, 1955.
[13] S. Moturi, "Autonomous Worker Availability and Governance Systems Architecture," Technical Report, 2026.
[14] V. Kumar and S. Rajan, "Emerging Trends in Hyperlocal Delivery and Gig Worker Optimization," IJCA, 182(45):12-18, 2021.
[15] F. Carbone and A. Rossi, "Security and Privacy in Smart Home Service Delivery Platforms," IoT, 19:100561, 2022.
[16] B. Sarwar, G. Karypis, J. Konstan, and J. Riedl, "Item-based Collaborative Filtering Algorithms," in Proc. WWW, 2001, pp. 285-295.
[17] A. Radford et al., "Robust Speech Recognition via Large-Scale Weak Supervision," in Proc. ICML, 2023.
[18] E. J. O'Neil, P. E. O'Neil, and G. Weikum, "The LRU-K Page Replacement Algorithm," ACM SIGMOD Rec., 22(2):297-306, 1993.
[19] H. Su et al., "Crowd-steering: Efficient and adaptable task assignment in spatial crowdsourcing," IEEE TKDE, 28(10):2618-2631, 2016.
[20] T. Tong et al., "Online mobile micro-task allocation in spatial crowdsourcing," in Proc. IEEE ICDE, 2016, pp. 49-60.
[21] Y. Zhao, Y. Zheng, and G. Li, "Spatial crowdsourcing: Challenges, solutions, and future directions," Proc. VLDB, 10(12):2000-2003, 2017.
[22] M. S. Asghar and M. K. K. Niazi, "Reputation management systems for crowdsourcing," IEEE Access, 8:162985-163004, 2020.
[23] X. Zhou et al., "Location-sensitive and QoS-aware worker selection for crowdsensing tasks," IEEE TSC, 14(4):1184-1198, 2021.
[24] R. Buyya et al., "A manifesto for future generation cloud computing," ACM Comput. Surv., 51(5):1-38, 2018.
[25] A. Zanella et al., "Internet of Things for smart cities," IEEE IoT J., 1(1):22-32, 2014.
