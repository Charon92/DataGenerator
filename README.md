# DataGenerator
A small project to generate fake user data.

### What is the output?
As of the initial version, it looks something like this:

Name (Date of birth) - Email:Password - Address as (Street, City, County, Country)

```bash
Benton Dundon (14-10-1900) - BentDund@netease.com:d!s34sep1easure& - 427 Fill Row Torbat-e Ḩeydarīyeh Razavi Khorasan Iran
Elian Mendi-Urkullu (12-1-2014) - EliMendi-Ur2014@qq.com:!nf0rm4tiongrat3* - 157 Gram Track Kenai Alaska USA
Daphine Yeddou (18-3-1914) - DaphinYeddo@outlook.com:farmerexaminationduct36942 - 163 Haunt Green Cambridge Cambridgeshire England
Nadi Buerger (25-5-1899) - NaBue1899@netease.com:memoryracedole36408 - 249 Insurance Track Rockwall Texas USA
Shuping Abalo (28-1-2010) - ShAb@qq.com:c0wf1oss( - 902 Stop Mews Minehead Somerset England
Maarten Ustimenko (30-1-1966) - MaaUs1966@qq.com:errorproducestir36758 - 951 Forever Boulevard Deerpark New York USA
Dinora Wahlich (26-7-1998) - DinWa1998@gmail.com:upst4!rsdiv0rc3% - 718 Soak Place Wallingford Oxfordshire England
Sonsoles Entov (5-8-1966) - SoEnto1966@yahoo.com:m4t3c0nc1us!on£ - 411 Low Boulevard Willowbrook Illinois USA
Gabriele Sternalsky (28-11-1970) - GaSte@netease.com:3dgegu!de% - 523 Handle Hill Hässleholm Skåne Sweden
Rie Picaud (27-5-1949) - RiPicau@gmail.com:forcepapertransport88239 - 342 Front Circus Berriozábal Chiapas Mexico
```

### How to run
- Run `npm install` to get the utilised libraries.
- Run `npm run start` or from the command line, run `node index.js`

The program accepts an `--amount` argument which, when supplied, will generate that amount of user data items. So, to generate 20 items you would call `node index.js --amount=20`. Currently this isn't perfect, I want to include as many countries and names as possible.

### Plans for the future
I'd like this to be a library that can be utilised and called as well as a CLI whose output can be shaped to produce whatever output is desired (ideally selecting the exact features you'd like).
