export { buildSDGsSchema }


// Function to build a more concise SDG data schema object
function buildSDGsSchema(){
    const schema = {}
    // GOALS: Extract each SDG
    for(const goal of goalList[0]){
        schema[goal.code] = {
            title:          goal.title,
            description:    goal.description,
            target:         {},
            targetList:     []      // Ordered list for maintaining SDG schema
        }

        // TARGETS: Extract targets (list and info) for each SDG
        schema[goal.code].targetList = targetList.filter(d => d.goal === goal.code).map(d => d.code)        
        for(const target of targetList.filter(d => d.goal === goal.code)){
             schema[goal.code].target[target.code] = {
                title:              target.title,
                goal:               goal.code,
                description:        target.description,
                indicator:          {},
                indicatorList:      []          // Ordered list for maintaining SDG schema
            }
            // INDICATORS: Extract targets (list and info) for each SDG
            schema[goal.code].target[target.code].indicatorList = indicatorList.filter(d => d.target === target.code).map(d => d.code)  
            if (schema[goal.code].target[target.code].indicatorList.length > 0){
                for(const indicator of indicatorList.filter(d => d.target === target.code)){
                    schema[goal.code].target[target.code].indicator[indicator.code] = {
                        goal:               goal.code, 
                        target:             target.code,
                        description:        indicator.description,
                        proxies:            {}       // Object for adding data proxies
                    }
                }

            }  else {
                schema[goal.code].target[target.code].indicatorList = ["na"]
                schema[goal.code].target[target.code].indicator["na"] = {
                    description:        null,
                    proxies:            {}       // Object for adding data proxies
                }
            }    
        }  
    }

    return schema
}; // end buildSDGSchema()



// COPIES OF THE SDGs DATASET 
// Static copy used for development and in production as the API seems to be slow https://unstats.un.org/SDGAPI/swagger/

// https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=false
const goalList = [
    [
        {
            "code": "1",
            "title": "End poverty in all its forms everywhere",
            "description": "Goal 1 calls for an end to poverty in all its manifestations, including extreme poverty, over the next 15 years. All people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits.",
            "uri": "/v1/sdg/Goal/1"
        },
        {
            "code": "2",
            "title": "End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
            "description": "Goal 2 seeks to end hunger and all forms of malnutrition and to achieve sustainable food production by 2030. It is premised on the idea that everyone should have access to sufficient nutritious food, which will require widespread promotion of sustainable agriculture, a doubling of agricultural productivity, increased investments and properly functioning food markets.",
            "uri": "/v1/sdg/Goal/2"
        },
        {
            "code": "3",
            "title": "Ensure healthy lives and promote well-being for all at all ages",
            "description": "Goal 3 aims to ensure health and well-being for all at all ages by improving reproductive, maternal and child health; ending the epidemics of major communicable diseases; reducing non-communicable and environmental diseases; achieving universal health coverage; and ensuring access to safe, affordable and effective medicines and vaccines for all.",
            "uri": "/v1/sdg/Goal/3"
        },
        {
            "code": "4",
            "title": "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all",
            "description": "Goal 4 focuses on the acquisition of foundational and higher-order skills; greater and more equitable access to technical and vocational education and training and higher education; training throughout life; and the knowledge, skills and values needed to function well and contribute to society.",
            "uri": "/v1/sdg/Goal/4"
        },
        {
            "code": "5",
            "title": "Achieve gender equality and empower all women and girls",
            "description": "Goal 5 aims to empower women and girls to reach their full potential, which requires eliminating all forms of discrimination and violence against them, including harmful practices. It seeks to ensure that they have every opportunity for sexual and reproductive health and reproductive rights; receive due recognition for their unpaid work; have full access to productive resources; and enjoy equal participation with men in political, economic and public life.",
            "uri": "/v1/sdg/Goal/5"
        },
        {
            "code": "6",
            "title": "Ensure availability and sustainable management of water and sanitation for all",
            "description": "Goal 6 goes beyond drinking water, sanitation and hygiene to also address the quality and sustainability of water resources. Achieving this Goal, which is critical to the survival of people and the planet, means expanding international cooperation and garnering the support of local communities in improving water and sanitation management.",
            "uri": "/v1/sdg/Goal/6"
        },
        {
            "code": "7",
            "title": "Ensure access to affordable, reliable, sustainable and modern energy for all",
            "description": "Goal 7 seeks to promote broader energy access and increased use of renewable energy, including through enhanced international cooperation and expanded infrastructure and technology for clean energy.",
            "uri": "/v1/sdg/Goal/7"
        },
        {
            "code": "8",
            "title": "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
            "description": "Goal 8 aims to provide opportunities for full and productive employment and decent work for all while eradicating forced labour, human trafficking and child labour.",
            "uri": "/v1/sdg/Goal/8"
        },
        {
            "code": "9",
            "title": "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
            "description": "Goal 9 focuses on the promotion of infrastructure development, industrialization and innovation. This can be accomplished through enhanced international and domestic financial, technological and technical support, research and innovation, and increased access to information and communication technology.",
            "uri": "/v1/sdg/Goal/9"
        },
        {
            "code": "10",
            "title": "Reduce inequality within and among countries",
            "description": "Goal 10 calls for reducing inequalities in income, as well as those based on sex, age, disability, race, class, ethnicity, religion and opportunity???both within and among countries. It also aims to ensure safe, orderly and regular migration and addresses issues related to representation of developing countries in global decision-making and development assistance.",
            "uri": "/v1/sdg/Goal/10"
        },
        {
            "code": "11",
            "title": "Make cities and human settlements inclusive, safe, resilient and sustainable",
            "description": "Goal 11 aims to renew and plan cities and other human settlements in a way that fosters community cohesion and personal security while stimulating innovation and employment.",
            "uri": "/v1/sdg/Goal/11"
        },
        {
            "code": "12",
            "title": "Ensure sustainable consumption and production patterns",
            "description": "Goal 12 aims to promote sustainable consumption and production patterns through measures such as specific policies and international agreements on the management of materials that are toxic to the environment.",
            "uri": "/v1/sdg/Goal/12"
        },
        {
            "code": "13",
            "title": "Take urgent action to combat climate change and its impacts",
            "description": "Climate change presents the single biggest threat to development, and its widespread, unprecedented effects disproportionately burden the poorest and the most vulnerable. Urgent action is needed not only to combat climate change and its impacts, but also to build resilience in responding to climate-related hazards and natural disasters.",
            "uri": "/v1/sdg/Goal/13"
        },
        {
            "code": "14",
            "title": "Conserve and sustainably use the oceans, seas and marine resources for sustainable development",
            "description": "Goal 14 seeks to promote the conservation and sustainable use of marine and coastal ecosystems, prevent marine pollution and increase the economic benefits to small island developing States and LDCs from the sustainable use of marine resources.",
            "uri": "/v1/sdg/Goal/14"
        },
        {
            "code": "15",
            "title": "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss",
            "description": "Goal 15 focuses on managing forests sustainably, restoring degraded lands and successfully combating desertification, reducing degraded natural habitats and ending biodiversity loss. All of these efforts in combination will help ensure that livelihoods are preserved for those that depend directly on forests and other ecosystems, that biodiversity will thrive, and that the benefits of these natural resources will be enjoyed for generations to come.",
            "uri": "/v1/sdg/Goal/15"
        },
        {
            "code": "16",
            "title": "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels",
            "description": "Goal 16 envisages peaceful and inclusive societies based on respect for human rights, the rule of law, good governance at all levels, and transparent, effective and accountable institutions. Many countries still face protracted violence and armed conflict, and far too many people are poorly supported by weak institutions and lack access to justice, information and other fundamental freedoms.",
            "uri": "/v1/sdg/Goal/16"
        },
        {
            "code": "17",
            "title": "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development",
            "description": "The 2030 Agenda requires a revitalized and enhanced global partnership that mobilizes all available resources from Governments, civil society, the private sector, the United Nations system and other actors. Increasing support to developing countries, in particular LDCs, landlocked developing countries and small island developing States is fundamental to equitable progress for all.",
            "uri": "/v1/sdg/Goal/17"
        }
    ]
]

// https://unstats.un.org/SDGAPI/v1/sdg/Target/List?includechildren=false
const targetList = [
    {
        "goal": "1",
        "code": "1.1",
        "title": "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day",
        "description": "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day",
        "uri": "/v1/sdg/Target/1.1",
        "indicators": null
    },
    {
        "goal": "1",
        "code": "1.2",
        "title": "By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
        "description": "By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
        "uri": "/v1/sdg/Target/1.2",
        "indicators": null
    },
    {
        "goal": "1",
        "code": "1.3",
        "title": "Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable",
        "description": "Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable",
        "uri": "/v1/sdg/Target/1.3",
        "indicators": null
    },
    {
        "goal": "1",
        "code": "1.4",
        "title": "By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance",
        "description": "By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance",
        "uri": "/v1/sdg/Target/1.4",
        "indicators": null
    },
    {
        "goal": "1",
        "code": "1.5",
        "title": "By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters",
        "description": "By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters",
        "uri": "/v1/sdg/Target/1.5",
        "indicators": null
    },
    {
        "goal": "1",
        "code": "1.a",
        "title": "Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions",
        "description": "Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions",
        "uri": "/v1/sdg/Target/1.a",
        "indicators": null
    },
    {
        "goal": "1",
        "code": "1.b",
        "title": "Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions",
        "description": "Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender-sensitive development strategies, to support accelerated investment in poverty eradication actions",
        "uri": "/v1/sdg/Target/1.b",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.1",
        "title": "By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round",
        "description": "By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious and sufficient food all year round",
        "uri": "/v1/sdg/Target/2.1",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.2",
        "title": "By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women and older persons",
        "description": "By 2030, end all forms of malnutrition, including achieving, by 2025, the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women and older persons",
        "uri": "/v1/sdg/Target/2.2",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.3",
        "title": "By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists and fishers, including through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets and opportunities for value addition and non-farm employment",
        "description": "By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists and fishers, including through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets and opportunities for value addition and non-farm employment",
        "uri": "/v1/sdg/Target/2.3",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.4",
        "title": "By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters and that progressively improve land and soil quality",
        "description": "By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters and that progressively improve land and soil quality",
        "uri": "/v1/sdg/Target/2.4",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.5",
        "title": "By 2020, maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed",
        "description": "By 2020, maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed",
        "uri": "/v1/sdg/Target/2.5",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.a",
        "title": "Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development and plant and livestock gene banks in order to enhance agricultural productive capacity in developing countries, in particular least developed countries",
        "description": "Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development and plant and livestock gene banks in order to enhance agricultural productive capacity in developing countries, in particular least developed countries",
        "uri": "/v1/sdg/Target/2.a",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.b",
        "title": "Correct and prevent trade restrictions and distortions in world agricultural markets, including through the parallel elimination of all forms of agricultural export subsidies and all export measures with equivalent effect, in accordance with the mandate of the Doha Development Round",
        "description": "Correct and prevent trade restrictions and distortions in world agricultural markets, including through the parallel elimination of all forms of agricultural export subsidies and all export measures with equivalent effect, in accordance with the mandate of the Doha Development Round",
        "uri": "/v1/sdg/Target/2.b",
        "indicators": null
    },
    {
        "goal": "2",
        "code": "2.c",
        "title": "Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility",
        "description": "Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility",
        "uri": "/v1/sdg/Target/2.c",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.1",
        "title": "By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births",
        "description": "By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births",
        "uri": "/v1/sdg/Target/3.1",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.2",
        "title": "By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births and under-5 mortality to at least as low as 25 per 1,000 live births",
        "description": "By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births and under-5 mortality to at least as low as 25 per 1,000 live births",
        "uri": "/v1/sdg/Target/3.2",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.3",
        "title": "By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases",
        "description": "By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases",
        "uri": "/v1/sdg/Target/3.3",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.4",
        "title": "By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being",
        "description": "By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being",
        "uri": "/v1/sdg/Target/3.4",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.5",
        "title": "Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol",
        "description": "Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol",
        "uri": "/v1/sdg/Target/3.5",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.6",
        "title": "By 2020, halve the number of global deaths and injuries from road traffic accidents",
        "description": "By 2020, halve the number of global deaths and injuries from road traffic accidents",
        "uri": "/v1/sdg/Target/3.6",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.7",
        "title": "By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes",
        "description": "By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes",
        "uri": "/v1/sdg/Target/3.7",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.8",
        "title": "Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines for all",
        "description": "Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines for all",
        "uri": "/v1/sdg/Target/3.8",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.9",
        "title": "By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination",
        "description": "By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination",
        "uri": "/v1/sdg/Target/3.9",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.a",
        "title": "Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate",
        "description": "Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate",
        "uri": "/v1/sdg/Target/3.a",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.b",
        "title": "Support the research and development of vaccines and medicines for the communicable and non-communicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the provisions in the Agreement on Trade-Related Aspects of Intellectual Property Rights regarding flexibilities to protect public health, and, in particular, provide access to medicines for all",
        "description": "Support the research and development of vaccines and medicines for the communicable and non-communicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the provisions in the Agreement on Trade-Related Aspects of Intellectual Property Rights regarding flexibilities to protect public health, and, in particular, provide access to medicines for all",
        "uri": "/v1/sdg/Target/3.b",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.c",
        "title": "Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States",
        "description": "Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States",
        "uri": "/v1/sdg/Target/3.c",
        "indicators": null
    },
    {
        "goal": "3",
        "code": "3.d",
        "title": "Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks",
        "description": "Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks",
        "uri": "/v1/sdg/Target/3.d",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.1",
        "title": "By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and effective learning outcomes",
        "description": "By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and effective learning outcomes",
        "uri": "/v1/sdg/Target/4.1",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.2",
        "title": "By 2030, ensure that all girls and boys have access to quality early childhood development, care and pre-primary education so that they are ready for primary education",
        "description": "By 2030, ensure that all girls and boys have access to quality early childhood development, care and pre-primary education so that they are ready for primary education",
        "uri": "/v1/sdg/Target/4.2",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.3",
        "title": "By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university",
        "description": "By 2030, ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education, including university",
        "uri": "/v1/sdg/Target/4.3",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.4",
        "title": "By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship",
        "description": "By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs and entrepreneurship",
        "uri": "/v1/sdg/Target/4.4",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.5",
        "title": "By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations",
        "description": "By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples and children in vulnerable situations",
        "uri": "/v1/sdg/Target/4.5",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.6",
        "title": "By 2030, ensure that all youth and a substantial proportion of adults, both men and women, achieve literacy and numeracy",
        "description": "By 2030, ensure that all youth and a substantial proportion of adults, both men and women, achieve literacy and numeracy",
        "uri": "/v1/sdg/Target/4.6",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.7",
        "title": "By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture's contribution to sustainable development",
        "description": "By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including, among others, through education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship and appreciation of cultural diversity and of culture's contribution to sustainable development",
        "uri": "/v1/sdg/Target/4.7",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.a",
        "title": "Build and upgrade education facilities that are child, disability and gender sensitive and provide safe, non-violent, inclusive and effective learning environments for all",
        "description": "Build and upgrade education facilities that are child, disability and gender sensitive and provide safe, non-violent, inclusive and effective learning environments for all",
        "uri": "/v1/sdg/Target/4.a",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.b",
        "title": "By 2020, substantially expand globally the number of scholarships available to developing countries, in particular least developed countries, small island developing States and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering and scientific programmes, in developed countries and other developing countries",
        "description": "By 2020, substantially expand globally the number of scholarships available to developing countries, in particular least developed countries, small island developing States and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering and scientific programmes, in developed countries and other developing countries",
        "uri": "/v1/sdg/Target/4.b",
        "indicators": null
    },
    {
        "goal": "4",
        "code": "4.c",
        "title": "By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing States",
        "description": "By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing States",
        "uri": "/v1/sdg/Target/4.c",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.1",
        "title": "End all forms of discrimination against all women and girls everywhere",
        "description": "End all forms of discrimination against all women and girls everywhere",
        "uri": "/v1/sdg/Target/5.1",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.2",
        "title": "Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation",
        "description": "Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation",
        "uri": "/v1/sdg/Target/5.2",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.3",
        "title": "Eliminate all harmful practices, such as child, early and forced marriage and female genital mutilation",
        "description": "Eliminate all harmful practices, such as child, early and forced marriage and female genital mutilation",
        "uri": "/v1/sdg/Target/5.3",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.4",
        "title": "Recognize and value unpaid care and domestic work through the provision of public services, infrastructure and social protection policies and the promotion of shared responsibility within the household and the family as nationally appropriate",
        "description": "Recognize and value unpaid care and domestic work through the provision of public services, infrastructure and social protection policies and the promotion of shared responsibility within the household and the family as nationally appropriate",
        "uri": "/v1/sdg/Target/5.4",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.5",
        "title": "Ensure women's full and effective participation and equal opportunities for leadership at all levels of decision-making in political, economic and public life",
        "description": "Ensure women's full and effective participation and equal opportunities for leadership at all levels of decision-making in political, economic and public life",
        "uri": "/v1/sdg/Target/5.5",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.6",
        "title": "Ensure universal access to sexual and reproductive health and reproductive rights as agreed in accordance with the Programme of Action of the International Conference on Population and Development and the Beijing Platform for Action and the outcome documents of their review conferences",
        "description": "Ensure universal access to sexual and reproductive health and reproductive rights as agreed in accordance with the Programme of Action of the International Conference on Population and Development and the Beijing Platform for Action and the outcome documents of their review conferences",
        "uri": "/v1/sdg/Target/5.6",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.a",
        "title": "Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property, financial services, inheritance and natural resources, in accordance with national laws",
        "description": "Undertake reforms to give women equal rights to economic resources, as well as access to ownership and control over land and other forms of property, financial services, inheritance and natural resources, in accordance with national laws",
        "uri": "/v1/sdg/Target/5.a",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.b",
        "title": "Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women",
        "description": "Enhance the use of enabling technology, in particular information and communications technology, to promote the empowerment of women",
        "uri": "/v1/sdg/Target/5.b",
        "indicators": null
    },
    {
        "goal": "5",
        "code": "5.c",
        "title": "Adopt and strengthen sound policies and enforceable legislation for the promotion of gender equality and the empowerment of all women and girls at all levels",
        "description": "Adopt and strengthen sound policies and enforceable legislation for the promotion of gender equality and the empowerment of all women and girls at all levels",
        "uri": "/v1/sdg/Target/5.c",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.1",
        "title": "By 2030, achieve universal and equitable access to safe and affordable drinking water for all",
        "description": "By 2030, achieve universal and equitable access to safe and affordable drinking water for all",
        "uri": "/v1/sdg/Target/6.1",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.2",
        "title": "By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations",
        "description": "By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations",
        "uri": "/v1/sdg/Target/6.2",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.3",
        "title": "By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally",
        "description": "By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally",
        "uri": "/v1/sdg/Target/6.3",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.4",
        "title": "By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity",
        "description": "By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity",
        "uri": "/v1/sdg/Target/6.4",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.5",
        "title": "By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate",
        "description": "By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate",
        "uri": "/v1/sdg/Target/6.5",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.6",
        "title": "By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes",
        "description": "By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes",
        "uri": "/v1/sdg/Target/6.6",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.a",
        "title": "By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies",
        "description": "By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies",
        "uri": "/v1/sdg/Target/6.a",
        "indicators": null
    },
    {
        "goal": "6",
        "code": "6.b",
        "title": "Support and strengthen the participation of local communities in improving water and sanitation management",
        "description": "Support and strengthen the participation of local communities in improving water and sanitation management",
        "uri": "/v1/sdg/Target/6.b",
        "indicators": null
    },
    {
        "goal": "7",
        "code": "7.1",
        "title": "By 2030, ensure universal access to affordable, reliable and modern energy services",
        "description": "By 2030, ensure universal access to affordable, reliable and modern energy services",
        "uri": "/v1/sdg/Target/7.1",
        "indicators": null
    },
    {
        "goal": "7",
        "code": "7.2",
        "title": "By 2030, increase substantially the share of renewable energy in the global energy mix",
        "description": "By 2030, increase substantially the share of renewable energy in the global energy mix",
        "uri": "/v1/sdg/Target/7.2",
        "indicators": null
    },
    {
        "goal": "7",
        "code": "7.3",
        "title": "By 2030, double the global rate of improvement in energy efficiency",
        "description": "By 2030, double the global rate of improvement in energy efficiency",
        "uri": "/v1/sdg/Target/7.3",
        "indicators": null
    },
    {
        "goal": "7",
        "code": "7.a",
        "title": "By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology",
        "description": "By 2030, enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology",
        "uri": "/v1/sdg/Target/7.a",
        "indicators": null
    },
    {
        "goal": "7",
        "code": "7.b",
        "title": "By 2030, expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, in particular least developed countries, small island developing States and landlocked developing countries, in accordance with their respective programmes of support",
        "description": "By 2030, expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, in particular least developed countries, small island developing States and landlocked developing countries, in accordance with their respective programmes of support",
        "uri": "/v1/sdg/Target/7.b",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.2",
        "title": "Achieve higher levels of economic productivity through diversification, technological upgrading and innovation, including through a focus on high-value added and labour-intensive sectors",
        "description": "Achieve higher levels of economic productivity through diversification, technological upgrading and innovation, including through a focus on high-value added and labour-intensive sectors",
        "uri": "/v1/sdg/Target/8.2",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.3",
        "title": "Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation, and encourage the formalization and growth of micro-, small- and medium-sized enterprises, including through access to financial services",
        "description": "Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation, and encourage the formalization and growth of micro-, small- and medium-sized enterprises, including through access to financial services",
        "uri": "/v1/sdg/Target/8.3",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.4",
        "title": "Improve progressively, through 2030, global resource efficiency in consumption and production and endeavour to decouple economic growth from environmental degradation, in accordance with the 10-Year Framework of Programmes on Sustainable Consumption and Production, with developed countries taking the lead",
        "description": "Improve progressively, through 2030, global resource efficiency in consumption and production and endeavour to decouple economic growth from environmental degradation, in accordance with the 10-Year Framework of Programmes on Sustainable Consumption and Production, with developed countries taking the lead",
        "uri": "/v1/sdg/Target/8.4",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.5",
        "title": "By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value",
        "description": "By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value",
        "uri": "/v1/sdg/Target/8.5",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.6",
        "title": "By 2020, substantially reduce the proportion of youth not in employment, education or training",
        "description": "By 2020, substantially reduce the proportion of youth not in employment, education or training",
        "uri": "/v1/sdg/Target/8.6",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.7",
        "title": "Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking and secure the prohibition and elimination of the worst forms of child labour, including recruitment and use of child soldiers, and by 2025 end child labour in all its forms",
        "description": "Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking and secure the prohibition and elimination of the worst forms of child labour, including recruitment and use of child soldiers, and by 2025 end child labour in all its forms",
        "uri": "/v1/sdg/Target/8.7",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.1",
        "title": "Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries",
        "description": "Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries",
        "uri": "/v1/sdg/Target/8.1",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.8",
        "title": "Protect labour rights and promote safe and secure working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment",
        "description": "Protect labour rights and promote safe and secure working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment",
        "uri": "/v1/sdg/Target/8.8",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.9",
        "title": "By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products",
        "description": "By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products",
        "uri": "/v1/sdg/Target/8.9",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.10",
        "title": "Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all",
        "description": "Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all",
        "uri": "/v1/sdg/Target/8.10",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.a",
        "title": "Increase Aid for Trade support for developing countries, in particular least developed countries, including through the Enhanced Integrated Framework for Trade-related Technical Assistance to Least Developed Countries",
        "description": "Increase Aid for Trade support for developing countries, in particular least developed countries, including through the Enhanced Integrated Framework for Trade-related Technical Assistance to Least Developed Countries",
        "uri": "/v1/sdg/Target/8.a",
        "indicators": null
    },
    {
        "goal": "8",
        "code": "8.b",
        "title": "By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization",
        "description": "By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization",
        "uri": "/v1/sdg/Target/8.b",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.1",
        "title": "Develop quality, reliable, sustainable and resilient infrastructure, including regional and trans-border infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all",
        "description": "Develop quality, reliable, sustainable and resilient infrastructure, including regional and trans-border infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all",
        "uri": "/v1/sdg/Target/9.1",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.2",
        "title": "Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry's share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries",
        "description": "Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry's share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries",
        "uri": "/v1/sdg/Target/9.2",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.3",
        "title": "Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets",
        "description": "Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets",
        "uri": "/v1/sdg/Target/9.3",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.4",
        "title": "By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes, with all countries taking action in accordance with their respective capabilities",
        "description": "By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes, with all countries taking action in accordance with their respective capabilities",
        "uri": "/v1/sdg/Target/9.4",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.5",
        "title": "Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers per 1 million people and public and private research and development spending",
        "description": "Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers per 1 million people and public and private research and development spending",
        "uri": "/v1/sdg/Target/9.5",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.a",
        "title": "Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States",
        "description": "Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States",
        "uri": "/v1/sdg/Target/9.a",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.b",
        "title": "Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities",
        "description": "Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities",
        "uri": "/v1/sdg/Target/9.b",
        "indicators": null
    },
    {
        "goal": "9",
        "code": "9.c",
        "title": "Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020",
        "description": "Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020",
        "uri": "/v1/sdg/Target/9.c",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.1",
        "title": "By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average",
        "description": "By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average",
        "uri": "/v1/sdg/Target/10.1",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.2",
        "title": "By 2030, empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status",
        "description": "By 2030, empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status",
        "uri": "/v1/sdg/Target/10.2",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.3",
        "title": "Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard",
        "description": "Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard",
        "uri": "/v1/sdg/Target/10.3",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.4",
        "title": "Adopt policies, especially fiscal, wage and social protection policies, and progressively achieve greater equality",
        "description": "Adopt policies, especially fiscal, wage and social protection policies, and progressively achieve greater equality",
        "uri": "/v1/sdg/Target/10.4",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.5",
        "title": "Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations",
        "description": "Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations",
        "uri": "/v1/sdg/Target/10.5",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.6",
        "title": "Ensure enhanced representation and voice for developing countries in decision-making in global international economic and financial institutions in order to deliver more effective, credible, accountable and legitimate institutions",
        "description": "Ensure enhanced representation and voice for developing countries in decision-making in global international economic and financial institutions in order to deliver more effective, credible, accountable and legitimate institutions",
        "uri": "/v1/sdg/Target/10.6",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.7",
        "title": "Facilitate orderly, safe, regular and responsible migration and mobility of people, including through the implementation of planned and well-managed migration policies",
        "description": "Facilitate orderly, safe, regular and responsible migration and mobility of people, including through the implementation of planned and well-managed migration policies",
        "uri": "/v1/sdg/Target/10.7",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.a",
        "title": "Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements",
        "description": "Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements",
        "uri": "/v1/sdg/Target/10.a",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.b",
        "title": "Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States and landlocked developing countries, in accordance with their national plans and programmes",
        "description": "Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States and landlocked developing countries, in accordance with their national plans and programmes",
        "uri": "/v1/sdg/Target/10.b",
        "indicators": null
    },
    {
        "goal": "10",
        "code": "10.c",
        "title": "By 2030, reduce to less than 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent",
        "description": "By 2030, reduce to less than 3 per cent the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5 per cent",
        "uri": "/v1/sdg/Target/10.c",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.1",
        "title": "By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums",
        "description": "By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums",
        "uri": "/v1/sdg/Target/11.1",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.2",
        "title": "By 2030, provide access to safe, affordable, accessible and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations, women, children, persons with disabilities and older persons",
        "description": "By 2030, provide access to safe, affordable, accessible and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations, women, children, persons with disabilities and older persons",
        "uri": "/v1/sdg/Target/11.2",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.3",
        "title": "By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries",
        "description": "By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning and management in all countries",
        "uri": "/v1/sdg/Target/11.3",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.4",
        "title": "Strengthen efforts to protect and safeguard the world's cultural and natural heritage",
        "description": "Strengthen efforts to protect and safeguard the world's cultural and natural heritage",
        "uri": "/v1/sdg/Target/11.4",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.5",
        "title": "By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations",
        "description": "By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global gross domestic product caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations",
        "uri": "/v1/sdg/Target/11.5",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.6",
        "title": "By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management",
        "description": "By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management",
        "uri": "/v1/sdg/Target/11.6",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.7",
        "title": "By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities",
        "description": "By 2030, provide universal access to safe, inclusive and accessible, green and public spaces, in particular for women and children, older persons and persons with disabilities",
        "uri": "/v1/sdg/Target/11.7",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.a",
        "title": "Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening national and regional development planning",
        "description": "Support positive economic, social and environmental links between urban, peri-urban and rural areas by strengthening national and regional development planning",
        "uri": "/v1/sdg/Target/11.a",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.b",
        "title": "By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency, mitigation and adaptation to climate change, resilience to disasters, and develop and implement, in line with the Sendai Framework for Disaster Risk Reduction 2015-2030, holistic disaster risk management at all levels",
        "description": "By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency, mitigation and adaptation to climate change, resilience to disasters, and develop and implement, in line with the Sendai Framework for Disaster Risk Reduction 2015-2030, holistic disaster risk management at all levels",
        "uri": "/v1/sdg/Target/11.b",
        "indicators": null
    },
    {
        "goal": "11",
        "code": "11.c",
        "title": "Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials",
        "description": "Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials",
        "uri": "/v1/sdg/Target/11.c",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.1",
        "title": "Implement the 10-Year Framework of Programmes on Sustainable Consumption and Production Patterns, all countries taking action, with developed countries taking the lead, taking into account the development and capabilities of developing countries",
        "description": "Implement the 10-Year Framework of Programmes on Sustainable Consumption and Production Patterns, all countries taking action, with developed countries taking the lead, taking into account the development and capabilities of developing countries",
        "uri": "/v1/sdg/Target/12.1",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.2",
        "title": "By 2030, achieve the sustainable management and efficient use of natural resources",
        "description": "By 2030, achieve the sustainable management and efficient use of natural resources",
        "uri": "/v1/sdg/Target/12.2",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.3",
        "title": "By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses",
        "description": "By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses",
        "uri": "/v1/sdg/Target/12.3",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.4",
        "title": "By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment",
        "description": "By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment",
        "uri": "/v1/sdg/Target/12.4",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.5",
        "title": "By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse",
        "description": "By 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse",
        "uri": "/v1/sdg/Target/12.5",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.6",
        "title": "Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle",
        "description": "Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle",
        "uri": "/v1/sdg/Target/12.6",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.7",
        "title": "Promote public procurement practices that are sustainable, in accordance with national policies and priorities",
        "description": "Promote public procurement practices that are sustainable, in accordance with national policies and priorities",
        "uri": "/v1/sdg/Target/12.7",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.8",
        "title": "By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature",
        "description": "By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature",
        "uri": "/v1/sdg/Target/12.8",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.a",
        "title": "Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production",
        "description": "Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production",
        "uri": "/v1/sdg/Target/12.a",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.b",
        "title": "Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products",
        "description": "Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products",
        "uri": "/v1/sdg/Target/12.b",
        "indicators": null
    },
    {
        "goal": "12",
        "code": "12.c",
        "title": "Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies, where they exist, to reflect their environmental impacts, taking fully into account the specific needs and conditions of developing countries and minimizing the possible adverse impacts on their development in a manner that protects the poor and the affected communities",
        "description": "Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies, where they exist, to reflect their environmental impacts, taking fully into account the specific needs and conditions of developing countries and minimizing the possible adverse impacts on their development in a manner that protects the poor and the affected communities",
        "uri": "/v1/sdg/Target/12.c",
        "indicators": null
    },
    {
        "goal": "13",
        "code": "13.1",
        "title": "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries",
        "description": "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries",
        "uri": "/v1/sdg/Target/13.1",
        "indicators": null
    },
    {
        "goal": "13",
        "code": "13.2",
        "title": "Integrate climate change measures into national policies, strategies and planning",
        "description": "Integrate climate change measures into national policies, strategies and planning",
        "uri": "/v1/sdg/Target/13.2",
        "indicators": null
    },
    {
        "goal": "13",
        "code": "13.3",
        "title": "Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning",
        "description": "Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning",
        "uri": "/v1/sdg/Target/13.3",
        "indicators": null
    },
    {
        "goal": "13",
        "code": "13.a",
        "title": "Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible",
        "description": "Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible",
        "uri": "/v1/sdg/Target/13.a",
        "indicators": null
    },
    {
        "goal": "13",
        "code": "13.b",
        "title": "Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities",
        "description": "Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities",
        "uri": "/v1/sdg/Target/13.b",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.1",
        "title": "By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution",
        "description": "By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution",
        "uri": "/v1/sdg/Target/14.1",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.2",
        "title": "By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience, and take action for their restoration in order to achieve healthy and productive oceans",
        "description": "By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience, and take action for their restoration in order to achieve healthy and productive oceans",
        "uri": "/v1/sdg/Target/14.2",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.3",
        "title": "Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels",
        "description": "Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels",
        "uri": "/v1/sdg/Target/14.3",
        "indicators": null
    },

    {
        "goal": "14",
        "code": "14.4",
        "title": "By 2020, effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans, in order to restore fish stocks in the shortest time feasible, at least to levels that can produce maximum sustainable yield as determined by their biological characteristics",
        "description": "By 2020, effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans, in order to restore fish stocks in the shortest time feasible, at least to levels that can produce maximum sustainable yield as determined by their biological characteristics",
        "uri": "/v1/sdg/Target/14.4",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.5",
        "title": "By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information",
        "description": "By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information",
        "uri": "/v1/sdg/Target/14.5",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.6",
        "title": "By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies, recognizing that appropriate and effective special and differential treatment for developing and least developed countries should be an integral part of the World Trade Organization fisheries subsidies negotiation [c]",
        "description": "By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies, recognizing that appropriate and effective special and differential treatment for developing and least developed countries should be an integral part of the World Trade Organization fisheries subsidies negotiation [c]",
        "uri": "/v1/sdg/Target/14.6",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.7",
        "title": "By 2030, increase the economic benefits to small island developing States and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture and tourism",
        "description": "By 2030, increase the economic benefits to small island developing States and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture and tourism",
        "uri": "/v1/sdg/Target/14.7",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.a",
        "title": "Increase scientific knowledge, develop research capacity and transfer marine technology, taking into account the Intergovernmental Oceanographic Commission Criteria and Guidelines on the Transfer of Marine Technology, in order to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries",
        "description": "Increase scientific knowledge, develop research capacity and transfer marine technology, taking into account the Intergovernmental Oceanographic Commission Criteria and Guidelines on the Transfer of Marine Technology, in order to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries",
        "uri": "/v1/sdg/Target/14.a",
        "indicators": null
    },
    {
        "goal": "14",
        "code": "14.b",
        "title": "Provide access for small-scale artisanal fishers to marine resources and markets",
        "description": "Provide access for small-scale artisanal fishers to marine resources and markets",
        "uri": "/v1/sdg/Target/14.b",
        "indicators": null
    },

    {
        "goal": "14",
        "code": "14.c",
        "title": "Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in the United Nations Convention on the Law of the Sea, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158 of 'The future we want'",
        "description": "Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in the United Nations Convention on the Law of the Sea, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158 of 'The future we want'",
        "uri": "/v1/sdg/Target/14.c",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.1",
        "title": "By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international agreements",
        "description": "By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international agreements",
        "uri": "/v1/sdg/Target/15.1",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.2",
        "title": "By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests and substantially increase afforestation and reforestation globally",
        "description": "By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests and substantially increase afforestation and reforestation globally",
        "uri": "/v1/sdg/Target/15.2",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.3",
        "title": "By 2030, combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world",
        "description": "By 2030, combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods, and strive to achieve a land degradation-neutral world",
        "uri": "/v1/sdg/Target/15.3",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.4",
        "title": "By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, in order to enhance their capacity to provide benefits that are essential for sustainable development",
        "description": "By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, in order to enhance their capacity to provide benefits that are essential for sustainable development",
        "uri": "/v1/sdg/Target/15.4",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.5",
        "title": "Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity and, by 2020, protect and prevent the extinction of threatened species",
        "description": "Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity and, by 2020, protect and prevent the extinction of threatened species",
        "uri": "/v1/sdg/Target/15.5",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.6",
        "title": "Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to such resources, as internationally agreed",
        "description": "Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to such resources, as internationally agreed",
        "uri": "/v1/sdg/Target/15.6",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.7",
        "title": "Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products",
        "description": "Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products",
        "uri": "/v1/sdg/Target/15.7",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.8",
        "title": "By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive alien species on land and water ecosystems and control or eradicate the priority species",
        "description": "By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive alien species on land and water ecosystems and control or eradicate the priority species",
        "uri": "/v1/sdg/Target/15.8",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.9",
        "title": "By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies and accounts",
        "description": "By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies and accounts",
        "uri": "/v1/sdg/Target/15.9",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.a",
        "title": "Mobilize and significantly increase financial resources from all sources to conserve and sustainably use biodiversity and ecosystems",
        "description": "Mobilize and significantly increase financial resources from all sources to conserve and sustainably use biodiversity and ecosystems",
        "uri": "/v1/sdg/Target/15.a",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.b",
        "title": "Mobilize significant resources from all sources and at all levels to finance sustainable forest management and provide adequate incentives to developing countries to advance such management, including for conservation and reforestation",
        "description": "Mobilize significant resources from all sources and at all levels to finance sustainable forest management and provide adequate incentives to developing countries to advance such management, including for conservation and reforestation",
        "uri": "/v1/sdg/Target/15.b",
        "indicators": null
    },
    {
        "goal": "15",
        "code": "15.c",
        "title": "Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities",
        "description": "Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities",
        "uri": "/v1/sdg/Target/15.c",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.1",
        "title": "Significantly reduce all forms of violence and related death rates everywhere",
        "description": "Significantly reduce all forms of violence and related death rates everywhere",
        "uri": "/v1/sdg/Target/16.1",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.2",
        "title": "End abuse, exploitation, trafficking and all forms of violence against and torture of children",
        "description": "End abuse, exploitation, trafficking and all forms of violence against and torture of children",
        "uri": "/v1/sdg/Target/16.2",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.3",
        "title": "Promote the rule of law at the national and international levels and ensure equal access to justice for all",
        "description": "Promote the rule of law at the national and international levels and ensure equal access to justice for all",
        "uri": "/v1/sdg/Target/16.3",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.4",
        "title": "By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets and combat all forms of organized crime",
        "description": "By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets and combat all forms of organized crime",
        "uri": "/v1/sdg/Target/16.4",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.5",
        "title": "Substantially reduce corruption and bribery in all their forms",
        "description": "Substantially reduce corruption and bribery in all their forms",
        "uri": "/v1/sdg/Target/16.5",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.6",
        "title": "Develop effective, accountable and transparent institutions at all levels",
        "description": "Develop effective, accountable and transparent institutions at all levels",
        "uri": "/v1/sdg/Target/16.6",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.7",
        "title": "Ensure responsive, inclusive, participatory and representative decision-making at all levels",
        "description": "Ensure responsive, inclusive, participatory and representative decision-making at all levels",
        "uri": "/v1/sdg/Target/16.7",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.8",
        "title": "Broaden and strengthen the participation of developing countries in the institutions of global governance",
        "description": "Broaden and strengthen the participation of developing countries in the institutions of global governance",
        "uri": "/v1/sdg/Target/16.8",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.9",
        "title": "By 2030, provide legal identity for all, including birth registration",
        "description": "By 2030, provide legal identity for all, including birth registration",
        "uri": "/v1/sdg/Target/16.9",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.10",
        "title": "Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements",
        "description": "Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements",
        "uri": "/v1/sdg/Target/16.10",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.a",
        "title": "Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime",
        "description": "Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels, in particular in developing countries, to prevent violence and combat terrorism and crime",
        "uri": "/v1/sdg/Target/16.a",
        "indicators": null
    },
    {
        "goal": "16",
        "code": "16.b",
        "title": "Promote and enforce non-discriminatory laws and policies for sustainable development",
        "description": "Promote and enforce non-discriminatory laws and policies for sustainable development",
        "uri": "/v1/sdg/Target/16.b",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.1",
        "title": "Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection",
        "description": "Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection",
        "uri": "/v1/sdg/Target/17.1",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.2",
        "title": "Developed countries to implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of gross national income for official development assistance (ODA/GNI) to developing countries and 0.15 to 0.20 per cent of ODA/GNI to least developed countries; ODA providers are encouraged to consider setting a target to provide at least 0.20 per cent of ODA/GNI to least developed countries",
        "description": "Developed countries to implement fully their official development assistance commitments, including the commitment by many developed countries to achieve the target of 0.7 per cent of gross national income for official development assistance (ODA/GNI) to developing countries and 0.15 to 0.20 per cent of ODA/GNI to least developed countries; ODA providers are encouraged to consider setting a target to provide at least 0.20 per cent of ODA/GNI to least developed countries",
        "uri": "/v1/sdg/Target/17.2",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.3",
        "title": "Mobilize additional financial resources for developing countries from multiple sources",
        "description": "Mobilize additional financial resources for developing countries from multiple sources",
        "uri": "/v1/sdg/Target/17.3",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.4",
        "title": "Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief and debt restructuring, as appropriate, and address the external debt of highly indebted poor countries to reduce debt distress",
        "description": "Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief and debt restructuring, as appropriate, and address the external debt of highly indebted poor countries to reduce debt distress",
        "uri": "/v1/sdg/Target/17.4",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.5",
        "title": "Adopt and implement investment promotion regimes for least developed countries",
        "description": "Adopt and implement investment promotion regimes for least developed countries",
        "uri": "/v1/sdg/Target/17.5",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.6",
        "title": "Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge-sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism",
        "description": "Enhance North-South, South-South and triangular regional and international cooperation on and access to science, technology and innovation and enhance knowledge-sharing on mutually agreed terms, including through improved coordination among existing mechanisms, in particular at the United Nations level, and through a global technology facilitation mechanism",
        "uri": "/v1/sdg/Target/17.6",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.7",
        "title": "Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries on favourable terms, including on concessional and preferential terms, as mutually agreed",
        "description": "Promote the development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries on favourable terms, including on concessional and preferential terms, as mutually agreed",
        "uri": "/v1/sdg/Target/17.7",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.8",
        "title": "Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology",
        "description": "Fully operationalize the technology bank and science, technology and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology",
        "uri": "/v1/sdg/Target/17.8",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.9",
        "title": "Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the Sustainable Development Goals, including through North-South, South-South and triangular cooperation",
        "description": "Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the Sustainable Development Goals, including through North-South, South-South and triangular cooperation",
        "uri": "/v1/sdg/Target/17.9",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.10",
        "title": "Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, including through the conclusion of negotiations under its Doha Development Agenda",
        "description": "Promote a universal, rules-based, open, non-discriminatory and equitable multilateral trading system under the World Trade Organization, including through the conclusion of negotiations under its Doha Development Agenda",
        "uri": "/v1/sdg/Target/17.10",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.11",
        "title": "Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries' share of global exports by 2020",
        "description": "Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries' share of global exports by 2020",
        "uri": "/v1/sdg/Target/17.11",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.12",
        "title": "Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries, consistent with World Trade Organization decisions, including by ensuring that preferential rules of origin applicable to imports from least developed countries are transparent and simple, and contribute to facilitating market access",
        "description": "Realize timely implementation of duty-free and quota-free market access on a lasting basis for all least developed countries, consistent with World Trade Organization decisions, including by ensuring that preferential rules of origin applicable to imports from least developed countries are transparent and simple, and contribute to facilitating market access",
        "uri": "/v1/sdg/Target/17.12",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.13",
        "title": "Enhance global macroeconomic stability, including through policy coordination and policy coherence",
        "description": "Enhance global macroeconomic stability, including through policy coordination and policy coherence",
        "uri": "/v1/sdg/Target/17.13",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.14",
        "title": "Enhance policy coherence for sustainable development",
        "description": "Enhance policy coherence for sustainable development",
        "uri": "/v1/sdg/Target/17.14",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.15",
        "title": "Respect each country's policy space and leadership to establish and implement policies for poverty eradication and sustainable development",
        "description": "Respect each country's policy space and leadership to establish and implement policies for poverty eradication and sustainable development",
        "uri": "/v1/sdg/Target/17.15",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.16",
        "title": "Enhance the Global Partnership for Sustainable Development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources, to support the achievement of the Sustainable Development Goals in all countries, in particular developing countries",
        "description": "Enhance the Global Partnership for Sustainable Development, complemented by multi-stakeholder partnerships that mobilize and share knowledge, expertise, technology and financial resources, to support the achievement of the Sustainable Development Goals in all countries, in particular developing countries",
        "uri": "/v1/sdg/Target/17.16",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.17",
        "title": "Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships",
        "description": "Encourage and promote effective public, public-private and civil society partnerships, building on the experience and resourcing strategies of partnerships",
        "uri": "/v1/sdg/Target/17.17",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.18",
        "title": "By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data disaggregated by income, gender, age, race, ethnicity, migratory status, disability, geographic location and other characteristics relevant in national contexts",
        "description": "By 2020, enhance capacity-building support to developing countries, including for least developed countries and small island developing States, to increase significantly the availability of high-quality, timely and reliable data disaggregated by income, gender, age, race, ethnicity, migratory status, disability, geographic location and other characteristics relevant in national contexts",
        "uri": "/v1/sdg/Target/17.18",
        "indicators": null
    },
    {
        "goal": "17",
        "code": "17.19",
        "title": "By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product, and support statistical capacity-building in developing countries",
        "description": "By 2030, build on existing initiatives to develop measurements of progress on sustainable development that complement gross domestic product, and support statistical capacity-building in developing countries",
        "uri": "/v1/sdg/Target/17.19",
        "indicators": null
    }
]


//https://unstats.un.org/SDGAPI/v1/sdg/Indicator/List
const indicatorList = [
    {
        "goal": "1",
        "target": "1.1",
        "code": "1.1.1",
        "description": "Proportion of the population living below the international poverty line by sex, age, employment status and geographic location (urban/rural)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.1.1",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.1"
                ],
                "indicator": [
                    "1.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_POV_DAY1",
                "description": "Proportion of population below international poverty line (%)",
                "uri": "/v1/sdg/Series/SI_POV_DAY1"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.1"
                ],
                "indicator": [
                    "1.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_POV_EMP1",
                "description": "Employed population below international poverty line, by sex and age (%)",
                "uri": "/v1/sdg/Series/SI_POV_EMP1"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.2",
        "code": "1.2.1",
        "description": "Proportion of population living below the national poverty line, by sex and age",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.2.1",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.2"
                ],
                "indicator": [
                    "1.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_POV_NAHC",
                "description": "Proportion of population living below the national poverty line (%)",
                "uri": "/v1/sdg/Series/SI_POV_NAHC"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.2",
        "code": "1.2.2",
        "description": "Proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/1.2.2",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.2"
                ],
                "indicator": [
                    "1.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_MDP_MUHC",
                "description": "Proportion of population living in multidimensional poverty (%)",
                "uri": "/v1/sdg/Series/SD_MDP_MUHC"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.2"
                ],
                "indicator": [
                    "1.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_MDP_ANDI",
                "description": "Average proportion of deprivations for people multidimensionally poor (%)",
                "uri": "/v1/sdg/Series/SD_MDP_ANDI"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.2"
                ],
                "indicator": [
                    "1.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_MDP_MUHHC",
                "description": "Proportion of households living in multidimensional poverty (%)",
                "uri": "/v1/sdg/Series/SD_MDP_MUHHC"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.2"
                ],
                "indicator": [
                    "1.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_MDP_CSMP",
                "description": "Proportion of children living in child-specific multidimensional poverty (%)",
                "uri": "/v1/sdg/Series/SD_MDP_CSMP"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.2"
                ],
                "indicator": [
                    "1.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_MDP_ANDIHH",
                "description": "Average share of weighted deprivations of total households (intensity) (%)",
                "uri": "/v1/sdg/Series/SD_MDP_ANDIHH"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.3",
        "code": "1.3.1",
        "description": "Proportion of population covered by social protection floors/systems, by sex, distinguishing children, unemployed persons, older persons, persons with disabilities, pregnant women, newborns, work-injury victims and the poor and the vulnerable",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.3.1",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_MATNL",
                "description": "[ILO] Proportion of mothers with newborns receiving maternity cash benefit (%)",
                "uri": "/v1/sdg/Series/SI_COV_MATNL"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_POOR",
                "description": "[ILO] Proportion of poor population receiving social assistance cash benefit, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_POOR"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_SOCAST",
                "description": "[World Bank] Proportion of population covered by social assistance programs (%)",
                "uri": "/v1/sdg/Series/SI_COV_SOCAST"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_SOCINS",
                "description": "[World Bank] Proportion of population covered by social insurance programs (%)",
                "uri": "/v1/sdg/Series/SI_COV_SOCINS"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_CHLD",
                "description": "[ILO] Proportion of children/households receiving child/family cash benefit, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_CHLD"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_UEMP",
                "description": "[ILO] Proportion of unemployed persons receiving unemployment cash benefit, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_UEMP"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_VULN",
                "description": "[ILO] Proportion of vulnerable population receiving social assistance cash benefit, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_VULN"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_WKINJRY",
                "description": "[ILO] Proportion of employed population covered in the event of work injury, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_WKINJRY"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_BENFTS",
                "description": "[ILO] Proportion of population covered by at least one social protection benefit, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_BENFTS"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_DISAB",
                "description": "[ILO] Proportion of population with severe disabilities receiving disability cash benefit, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_DISAB"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_LMKT",
                "description": "[World Bank] Proportion of population covered by labour market programs (%)",
                "uri": "/v1/sdg/Series/SI_COV_LMKT"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.3"
                ],
                "indicator": [
                    "1.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_COV_PENSN",
                "description": "[ILO] Proportion of population above statutory pensionable age receiving a pension, by sex (%)",
                "uri": "/v1/sdg/Series/SI_COV_PENSN"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.4",
        "code": "1.4.1",
        "description": "Proportion of population living in households with access to basic services",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.4.1",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.4"
                ],
                "indicator": [
                    "1.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_ACS_BSRVH2O",
                "description": "Proportion of population using basic drinking water services, by location (%)",
                "uri": "/v1/sdg/Series/SP_ACS_BSRVH2O"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.4"
                ],
                "indicator": [
                    "1.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_ACS_BSRVSAN",
                "description": "Proportion of population using basic sanitation services, by location (%)",
                "uri": "/v1/sdg/Series/SP_ACS_BSRVSAN"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.4",
        "code": "1.4.2",
        "description": "Proportion of total adult population with secure tenure rights to land, (a) with legally recognized documentation, and (b) who perceive their rights to land as secure, by sex and type of tenure",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/1.4.2",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.4"
                ],
                "indicator": [
                    "1.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_LGL_LNDDOC",
                "description": "Proportion of people with legally recognized documentation of their rights to land out of total adult population, by sex (%)",
                "uri": "/v1/sdg/Series/SP_LGL_LNDDOC"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.4"
                ],
                "indicator": [
                    "1.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_LGL_LNDSEC",
                "description": "Proportion of people who perceive their rights to land as secure out of total adult population, by sex (%)",
                "uri": "/v1/sdg/Series/SP_LGL_LNDSEC"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.4"
                ],
                "indicator": [
                    "1.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_LGL_LNDSTR",
                "description": "Proportion of people with secure tenure rights to land out of total adult population, by sex (%)",
                "uri": "/v1/sdg/Series/SP_LGL_LNDSTR"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.5",
        "code": "1.5.1",
        "description": "Number of deaths, missing persons and directly affected persons attributed to disasters per 100,000 population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.5.1",
        "series": [
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MISS",
                "description": "Number of missing persons due to disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MISS"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_AFFCT",
                "description": "Number of people affected by disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_AFFCT"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MORT",
                "description": "Number of deaths due to disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MORT"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MTMP",
                "description": "Number of deaths and missing persons attributed to disasters per 100,000 population (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MTMP"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MMHN",
                "description": "Number of deaths and missing persons attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MMHN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_DAFF",
                "description": "Number of directly affected persons attributed to disasters per 100,000 population (number)",
                "uri": "/v1/sdg/Series/VC_DSR_DAFF"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_IJILN",
                "description": "Number of injured or ill people attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_IJILN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDAN",
                "description": "Number of people whose damaged dwellings were attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDAN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDYN",
                "description": "Number of people whose destroyed dwellings were attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDYN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDLN",
                "description": "Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDLN"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.5",
        "code": "1.5.2",
        "description": "Direct economic loss attributed to disasters in relation to global gross domestic product (GDP)",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/1.5.2",
        "series": [
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_GDPLS",
                "description": "Direct economic loss attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_GDPLS"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_LSGP",
                "description": "Direct economic loss attributed to disasters relative to GDP (%)",
                "uri": "/v1/sdg/Series/VC_DSR_LSGP"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_AGLH",
                "description": "Direct agriculture loss attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_AGLH"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_HOLH",
                "description": "Direct economic loss in the housing sector attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_HOLH"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_CILN",
                "description": "Direct economic loss resulting from damaged or destroyed critical infrastructure attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_CILN"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_CHLN",
                "description": "Direct economic loss to cultural heritage damaged or destroyed attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_CHLN"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_DDPA",
                "description": "Direct economic loss to other damaged or destroyed productive assets attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_DDPA"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.5",
        "code": "1.5.3",
        "description": "Number of countries that adopt and implement national disaster risk reduction strategies in line with the Sendai Framework for Disaster Risk Reduction 2015-2030",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.5.3",
        "series": [
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.b",
                    "13.1"
                ],
                "indicator": [
                    "1.5.3",
                    "11.b.1",
                    "13.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_LGRGSR",
                "description": "Score of adoption and implementation of national DRR strategies in line with the Sendai Framework",
                "uri": "/v1/sdg/Series/SG_DSR_LGRGSR"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.b",
                    "13.1"
                ],
                "indicator": [
                    "1.5.3",
                    "11.b.1",
                    "13.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SFDRR",
                "description": "Number of countries that reported having a National DRR Strategy which is aligned to the Sendai Framework",
                "uri": "/v1/sdg/Series/SG_DSR_SFDRR"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.5",
        "code": "1.5.4",
        "description": "Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/1.5.4",
        "series": [
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SILS",
                "description": "Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)",
                "uri": "/v1/sdg/Series/SG_DSR_SILS"
            },
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SILN",
                "description": "Number of local governments that adopt and implement local DRR strategies in line with national strategies (number)",
                "uri": "/v1/sdg/Series/SG_DSR_SILN"
            },
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GOV_LOGV",
                "description": "Number of local governments (number)",
                "uri": "/v1/sdg/Series/SG_GOV_LOGV"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.a",
        "code": "1.a.2",
        "description": "Proportion of total government spending on essential services (education, health and social protection)",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/1.a.2",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.a"
                ],
                "indicator": [
                    "1.a.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_XPD_ESED",
                "description": "Proportion of total government spending on essential services, education (%)",
                "uri": "/v1/sdg/Series/SD_XPD_ESED"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.a",
        "code": "1.a.1",
        "description": "Total official development assistance grants from all donors that focus on poverty reduction as a share of the recipient country???s gross national income",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/1.a.1",
        "series": [
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.a"
                ],
                "indicator": [
                    "1.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_POVLG",
                "description": "Official development assistance grants for poverty reduction, by recipient countries (percentage of GNI)",
                "uri": "/v1/sdg/Series/DC_ODA_POVLG"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.a"
                ],
                "indicator": [
                    "1.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_POVDLG",
                "description": "Official development assistance grants for poverty reduction, by donor countries (percentage of GNI)",
                "uri": "/v1/sdg/Series/DC_ODA_POVDLG"
            },
            {
                "goal": [
                    "1"
                ],
                "target": [
                    "1.a"
                ],
                "indicator": [
                    "1.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_POVG",
                "description": "Official development assistance grants for poverty reduction (percentage of GNI)",
                "uri": "/v1/sdg/Series/DC_ODA_POVG"
            }
        ]
    },
    {
        "goal": "1",
        "target": "1.b",
        "code": "1.b.1",
        "description": "Pro-poor public social spending",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/1.b.1",
        "series": []
    },
    {
        "goal": "2",
        "target": "2.1",
        "code": "2.1.1",
        "description": "Prevalence of undernourishment",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.1.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.1"
                ],
                "indicator": [
                    "2.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SN_ITK_DEFC",
                "description": "Prevalence of undernourishment (%)",
                "uri": "/v1/sdg/Series/SN_ITK_DEFC"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.1"
                ],
                "indicator": [
                    "2.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SN_ITK_DEFCN",
                "description": "Number of undernourished people (millions)",
                "uri": "/v1/sdg/Series/SN_ITK_DEFCN"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.1",
        "code": "2.1.2",
        "description": "Prevalence of moderate or severe food insecurity in the population, based on the Food Insecurity Experience Scale (FIES)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.1.2",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.1"
                ],
                "indicator": [
                    "2.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_FIESMS",
                "description": "Prevalence of moderate or severe food insecurity in the adult population (%)",
                "uri": "/v1/sdg/Series/AG_PRD_FIESMS"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.1"
                ],
                "indicator": [
                    "2.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_FIESMSN",
                "description": "Total population in moderate or severe food insecurity (thousands of people)",
                "uri": "/v1/sdg/Series/AG_PRD_FIESMSN"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.1"
                ],
                "indicator": [
                    "2.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_FIESS",
                "description": "Prevalence of severe food insecurity in the adult population (%)",
                "uri": "/v1/sdg/Series/AG_PRD_FIESS"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.1"
                ],
                "indicator": [
                    "2.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_FIESSN",
                "description": "Total population in severe food insecurity (thousands of people)",
                "uri": "/v1/sdg/Series/AG_PRD_FIESSN"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.2",
        "code": "2.2.1",
        "description": "Prevalence of stunting (height for age <-2 standard deviation from the median of the World Health Organization (WHO) Child Growth Standards) among children under 5 years of age",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.2.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_STNT",
                "description": "Proportion of children moderately or severely stunted (%)",
                "uri": "/v1/sdg/Series/SH_STA_STNT"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_STNTN",
                "description": "Children moderately or severely stunted (thousands)",
                "uri": "/v1/sdg/Series/SH_STA_STNTN"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.2",
        "code": "2.2.2",
        "description": "Prevalence of malnutrition (weight for height >+2 or <-2 standard deviation from the median of the WHO Child Growth Standards) among children under 5 years of age, by type (wasting and overweight)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.2.2",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_WAST",
                "description": "Proportion of children moderately or severely wasted (%)",
                "uri": "/v1/sdg/Series/SH_STA_WAST"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_WASTN",
                "description": "Children moderately or severely wasted (thousands)",
                "uri": "/v1/sdg/Series/SH_STA_WASTN"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SN_STA_OVWGT",
                "description": "Proportion of children moderately or severely overweight (%)",
                "uri": "/v1/sdg/Series/SN_STA_OVWGT"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SN_STA_OVWGTN",
                "description": "Children moderately or severely overweight (thousands)",
                "uri": "/v1/sdg/Series/SN_STA_OVWGTN"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.2",
        "code": "2.2.3",
        "description": "Prevalence of anaemia in women aged 15 to 49 years, by pregnancy status (percentage)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.2.3",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_ANEM",
                "description": "Proportion of women aged 15-49 years with anaemia (%)",
                "uri": "/v1/sdg/Series/SH_STA_ANEM"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_ANEM_PREG",
                "description": "Proportion of women aged 15-49 years with anaemia, pregnant (%)",
                "uri": "/v1/sdg/Series/SH_STA_ANEM_PREG"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.2"
                ],
                "indicator": [
                    "2.2.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_ANEM_NPRG",
                "description": "Proportion of women aged 15-49 years with anaemia, non-pregnant (%)",
                "uri": "/v1/sdg/Series/SH_STA_ANEM_NPRG"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.3",
        "code": "2.3.1",
        "description": "Volume of production per labour unit by classes of farming/pastoral/forestry enterprise size",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/2.3.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.3"
                ],
                "indicator": [
                    "2.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "PD_AGR_SSFP",
                "description": "Productivity of small-scale food producers (agricultural output per labour day, PPP) (constant 2011 international $)",
                "uri": "/v1/sdg/Series/PD_AGR_SSFP"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.3"
                ],
                "indicator": [
                    "2.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "PD_AGR_LSFP",
                "description": "Productivity of large-scale food producers (agricultural output per labour day, PPP) (constant 2011 international $)",
                "uri": "/v1/sdg/Series/PD_AGR_LSFP"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.3",
        "code": "2.3.2",
        "description": "Average income of small-scale food producers, by sex and indigenous status",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/2.3.2",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.3"
                ],
                "indicator": [
                    "2.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_AGR_SSFP",
                "description": "Average income of small-scale food producers, PPP (constant 2011 international $)",
                "uri": "/v1/sdg/Series/SI_AGR_SSFP"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.3"
                ],
                "indicator": [
                    "2.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_AGR_LSFP",
                "description": "Average income of large-scale food producers, PPP (constant 2011 international $)",
                "uri": "/v1/sdg/Series/SI_AGR_LSFP"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.4",
        "code": "2.4.1",
        "description": "Proportion of agricultural area under productive and sustainable agriculture",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/2.4.1",
        "series": []
    },
    {
        "goal": "2",
        "target": "2.5",
        "code": "2.5.1",
        "description": "Number of (a) plant and (b) animal genetic resources for food and agriculture secured in either medium- or long-term conservation facilities",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.5.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.5"
                ],
                "indicator": [
                    "2.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_GRF_ANIMRCNTN",
                "description": "Number of local breeds for which sufficient genetic resources are stored for reconstitution",
                "uri": "/v1/sdg/Series/ER_GRF_ANIMRCNTN"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.5"
                ],
                "indicator": [
                    "2.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_GRF_PLNTSTOR",
                "description": "Plant genetic resources accessions stored ex situ (number)",
                "uri": "/v1/sdg/Series/ER_GRF_PLNTSTOR"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.5",
        "code": "2.5.2",
        "description": "Proportion of local breeds classified as being at risk of extinction",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/2.5.2",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.5"
                ],
                "indicator": [
                    "2.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_RSK_LBREDS",
                "description": "Proportion of local breeds classified as being at risk as a share of local breeds with known level of extinction risk (%)",
                "uri": "/v1/sdg/Series/ER_RSK_LBREDS"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.a",
        "code": "2.a.1",
        "description": "The agriculture orientation index for government expenditures",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.a.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.a"
                ],
                "indicator": [
                    "2.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_ORTIND",
                "description": "Agriculture orientation index for government expenditures",
                "uri": "/v1/sdg/Series/AG_PRD_ORTIND"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.a"
                ],
                "indicator": [
                    "2.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_AGVAS",
                "description": "Agriculture value added share of GDP (%)",
                "uri": "/v1/sdg/Series/AG_PRD_AGVAS"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.a"
                ],
                "indicator": [
                    "2.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_XPD_AGSGB",
                "description": "Agriculture share of Government Expenditure (%)",
                "uri": "/v1/sdg/Series/AG_XPD_AGSGB"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.a",
        "code": "2.a.2",
        "description": "Total official flows (official development assistance plus other official flows) to the agriculture sector",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.a.2",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.a"
                ],
                "indicator": [
                    "2.a.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_AGRL",
                "description": "Total official flows (disbursements) for agriculture, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_AGRL"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.b",
        "code": "2.b.1",
        "description": "Agricultural export subsidies",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.b.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.b"
                ],
                "indicator": [
                    "2.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_PRD_XSUBDY",
                "description": "Agricultural export subsidies (millions of current United States dollars)",
                "uri": "/v1/sdg/Series/AG_PRD_XSUBDY"
            }
        ]
    },
    {
        "goal": "2",
        "target": "2.c",
        "code": "2.c.1",
        "description": "Indicator of food price anomalies",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/2.c.1",
        "series": [
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.c"
                ],
                "indicator": [
                    "2.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FPA_COMM",
                "description": "Indicator of Food Price Anomalies (IFPA), by type of product",
                "uri": "/v1/sdg/Series/AG_FPA_COMM"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.c"
                ],
                "indicator": [
                    "2.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FPA_CFPI",
                "description": "Indicator of Food Price Anomalies (IFPA), by Consumer Food Price Index",
                "uri": "/v1/sdg/Series/AG_FPA_CFPI"
            },
            {
                "goal": [
                    "2"
                ],
                "target": [
                    "2.c"
                ],
                "indicator": [
                    "2.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FPA_HMFP",
                "description": "Proportion of countries recording abnormally high or moderately high food prices, according to the Indicator of Food Price Anomalies (%)",
                "uri": "/v1/sdg/Series/AG_FPA_HMFP"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.1",
        "code": "3.1.1",
        "description": "Maternal mortality ratio",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.1.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.1"
                ],
                "indicator": [
                    "3.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_MORT",
                "description": "Maternal mortality ratio",
                "uri": "/v1/sdg/Series/SH_STA_MORT"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.1",
        "code": "3.1.2",
        "description": "Proportion of births attended by skilled health personnel",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.1.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.1"
                ],
                "indicator": [
                    "3.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_BRTC",
                "description": "Proportion of births attended by skilled health personnel (%)",
                "uri": "/v1/sdg/Series/SH_STA_BRTC"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.2",
        "code": "3.2.1",
        "description": "Under???5 mortality rate",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.2.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.2"
                ],
                "indicator": [
                    "3.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DYN_IMRTN",
                "description": "Infant deaths (number)",
                "uri": "/v1/sdg/Series/SH_DYN_IMRTN"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.2"
                ],
                "indicator": [
                    "3.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DYN_MORT",
                "description": "Under-five mortality rate, by sex (deaths per 1,000 live births)",
                "uri": "/v1/sdg/Series/SH_DYN_MORT"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.2"
                ],
                "indicator": [
                    "3.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DYN_IMRT",
                "description": "Infant mortality rate (deaths per 1,000 live births)",
                "uri": "/v1/sdg/Series/SH_DYN_IMRT"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.2"
                ],
                "indicator": [
                    "3.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DYN_MORTN",
                "description": "Under-five deaths (number)",
                "uri": "/v1/sdg/Series/SH_DYN_MORTN"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.2",
        "code": "3.2.2",
        "description": "Neonatal mortality rate",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.2.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.2"
                ],
                "indicator": [
                    "3.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DYN_NMRTN",
                "description": "Neonatal deaths (number)",
                "uri": "/v1/sdg/Series/SH_DYN_NMRTN"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.2"
                ],
                "indicator": [
                    "3.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DYN_NMRT",
                "description": "Neonatal mortality rate (deaths per 1,000 live births)",
                "uri": "/v1/sdg/Series/SH_DYN_NMRT"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.3",
        "code": "3.3.1",
        "description": "Number of new HIV infections per 1,000 uninfected population, by sex, age and key populations",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.3.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.3"
                ],
                "indicator": [
                    "3.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_HIV_INCD",
                "description": "Number of new HIV infections per 1,000 uninfected population, by sex and age (per 1,000 uninfected population)",
                "uri": "/v1/sdg/Series/SH_HIV_INCD"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.3",
        "code": "3.3.2",
        "description": "Tuberculosis incidence per 100,000 population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.3.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.3"
                ],
                "indicator": [
                    "3.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_TBS_INCD",
                "description": "Tuberculosis incidence (per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_TBS_INCD"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.3",
        "code": "3.3.3",
        "description": "Malaria incidence per 1,000 population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.3.3",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.3"
                ],
                "indicator": [
                    "3.3.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_MALR",
                "description": "Malaria incidence per 1,000 population at risk (per 1,000 population)",
                "uri": "/v1/sdg/Series/SH_STA_MALR"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.3",
        "code": "3.3.5",
        "description": "Number of people requiring interventions against neglected tropical diseases",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.3.5",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.3"
                ],
                "indicator": [
                    "3.3.5"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_TRP_INTVN",
                "description": "Number of people requiring interventions against neglected tropical diseases (number)",
                "uri": "/v1/sdg/Series/SH_TRP_INTVN"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.3",
        "code": "3.3.4",
        "description": "Hepatitis B incidence per 100,000 population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.3.4",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.3"
                ],
                "indicator": [
                    "3.3.4"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_HAP_HBSAG",
                "description": "Prevalence of hepatitis B surface antigen (HBsAg) (%)",
                "uri": "/v1/sdg/Series/SH_HAP_HBSAG"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.4",
        "code": "3.4.1",
        "description": "Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.4.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.4"
                ],
                "indicator": [
                    "3.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DTH_NCOM",
                "description": "Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease (probability)",
                "uri": "/v1/sdg/Series/SH_DTH_NCOM"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.4"
                ],
                "indicator": [
                    "3.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_DTH_NCD",
                "description": "Number of deaths attributed to non-communicable diseases, by type of disease and sex (number)",
                "uri": "/v1/sdg/Series/SH_DTH_NCD"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.4",
        "code": "3.4.2",
        "description": "Suicide mortality rate",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.4.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.4"
                ],
                "indicator": [
                    "3.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_SCIDE",
                "description": "Suicide mortality rate, by sex (deaths per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_STA_SCIDE"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.4"
                ],
                "indicator": [
                    "3.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_SCIDEN",
                "description": "Number of deaths attributed to suicide, by sex (number)",
                "uri": "/v1/sdg/Series/SH_STA_SCIDEN"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.5",
        "code": "3.5.2",
        "description": "Alcohol per capita consumption (aged 15 years and older) within a calendar year in litres of pure alcohol",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.5.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.5"
                ],
                "indicator": [
                    "3.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_ALC_CONSPT",
                "description": "Alcohol consumption per capita (aged 15 years and older) within a calendar year (litres of pure alcohol)",
                "uri": "/v1/sdg/Series/SH_ALC_CONSPT"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.5",
        "code": "3.5.1",
        "description": "Coverage of treatment interventions (pharmacological, psychosocial and rehabilitation and aftercare services) for substance use disorders",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/3.5.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.5"
                ],
                "indicator": [
                    "3.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_SUD_ALCOL",
                "description": "Alcohol use disorders, 12-month prevalence (%)",
                "uri": "/v1/sdg/Series/SH_SUD_ALCOL"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.5"
                ],
                "indicator": [
                    "3.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_SUD_TREAT",
                "description": "Coverage of treatment interventions (pharmacological, psychosocial and rehabilitation and aftercare services) for substance use disorders (%)",
                "uri": "/v1/sdg/Series/SH_SUD_TREAT"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.6",
        "code": "3.6.1",
        "description": "Death rate due to road traffic injuries",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.6.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.6"
                ],
                "indicator": [
                    "3.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_TRAF",
                "description": "Death rate due to road traffic injuries, by sex (per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_STA_TRAF"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.7",
        "code": "3.7.1",
        "description": "Proportion of women of reproductive age (aged 15-49 years) who have their need for family planning satisfied with modern methods",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.7.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.7"
                ],
                "indicator": [
                    "3.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_FPL_MTMM",
                "description": "Proportion of women of reproductive age (aged 15-49 years) who have their need for family planning satisfied with modern methods (% of women aged 15-49 years)",
                "uri": "/v1/sdg/Series/SH_FPL_MTMM"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.7",
        "code": "3.7.2",
        "description": "Adolescent birth rate (aged 10-14 years; aged 15-19 years) per 1,000 women in that age group",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.7.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.7"
                ],
                "indicator": [
                    "3.7.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_DYN_ADKL",
                "description": "Adolescent birth rate (per 1,000 women aged 15-19 and 10-14 years)",
                "uri": "/v1/sdg/Series/SP_DYN_ADKL"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.8",
        "code": "3.8.2",
        "description": "Proportion of population with large household expenditures on health as a share of total household expenditure or income",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.8.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.8"
                ],
                "indicator": [
                    "3.8.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_XPD_EARN25",
                "description": "Proportion of population with large household expenditures on health (greater than 25%) as a share of total household expenditure or income (%)",
                "uri": "/v1/sdg/Series/SH_XPD_EARN25"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.8"
                ],
                "indicator": [
                    "3.8.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_XPD_EARN10",
                "description": "Proportion of population with large household expenditures on health (greater than 10%) as a share of total household expenditure or income (%)",
                "uri": "/v1/sdg/Series/SH_XPD_EARN10"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.8",
        "code": "3.8.1",
        "description": "Coverage of essential health services",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.8.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.8"
                ],
                "indicator": [
                    "3.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_ACS_UNHC",
                "description": "Universal health coverage (UHC) service coverage index",
                "uri": "/v1/sdg/Series/SH_ACS_UNHC"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.9",
        "code": "3.9.1",
        "description": "Mortality rate attributed to household and ambient air pollution",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.9.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.9"
                ],
                "indicator": [
                    "3.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_HAP_ASMORT",
                "description": "Age-standardized mortality rate attributed to household air pollution (deaths per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_HAP_ASMORT"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.9"
                ],
                "indicator": [
                    "3.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_ASAIRP",
                "description": "Age-standardized mortality rate attributed to household and ambient air pollution (deaths per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_STA_ASAIRP"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.9"
                ],
                "indicator": [
                    "3.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_AAP_ASMORT",
                "description": "Age-standardized mortality rate attributed to ambient air pollution (deaths per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_AAP_ASMORT"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.9",
        "code": "3.9.2",
        "description": "Mortality rate attributed to unsafe water, unsafe sanitation and lack of hygiene (exposure to unsafe Water, Sanitation and Hygiene for All (WASH) services)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.9.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.9"
                ],
                "indicator": [
                    "3.9.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_WASHARI",
                "description": "Mortality rate attributed to unsafe water, unsafe sanitation and lack of hygiene from diarrhoea, intestinal nematode infections, malnutrition and acute respiratory infections (deaths per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_STA_WASHARI"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.9",
        "code": "3.9.3",
        "description": "Mortality rate attributed to unintentional poisoning",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.9.3",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.9"
                ],
                "indicator": [
                    "3.9.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_POISN",
                "description": "Mortality rate attributed to unintentional poisonings, by sex (deaths per 100,000 population)",
                "uri": "/v1/sdg/Series/SH_STA_POISN"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.a",
        "code": "3.a.1",
        "description": "Age-standardized prevalence of current tobacco use among persons aged 15 years and older",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.a.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.a"
                ],
                "indicator": [
                    "3.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_PRV_SMOK",
                "description": "Age-standardized prevalence of current tobacco use among persons aged 15 years and older, by sex (%)",
                "uri": "/v1/sdg/Series/SH_PRV_SMOK"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.b",
        "code": "3.b.2",
        "description": "Total net official development assistance to medical research and basic health sectors",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.b.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_HLTHNT",
                "description": "Total official development assistance to medical research and basic heath sectors, net disbursement, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_HLTHNT"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_HLTHL",
                "description": "Total official development assistance to medical research and basic heath sectors, gross disbursement, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_HLTHL"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.b",
        "code": "3.b.1",
        "description": "Proportion of the target population covered by all vaccines included in their national programme",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.b.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_ACS_DTP3",
                "description": "Proportion of the target population with access to 3 doses of diphtheria-tetanus-pertussis (DTP3) (%)",
                "uri": "/v1/sdg/Series/SH_ACS_DTP3"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_ACS_MCV2",
                "description": "Proportion of the target population with access to measles-containing-vaccine second-dose (MCV2) (%)",
                "uri": "/v1/sdg/Series/SH_ACS_MCV2"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_ACS_PCV3",
                "description": "Proportion of the target population with access to pneumococcal conjugate 3rd dose (PCV3) (%)",
                "uri": "/v1/sdg/Series/SH_ACS_PCV3"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_ACS_HPV",
                "description": "Proportion of the target population with access to affordable medicines and vaccines on a sustainable basis, human papillomavirus (HPV) (%)",
                "uri": "/v1/sdg/Series/SH_ACS_HPV"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.b",
        "code": "3.b.3",
        "description": "Proportion of health facilities that have a core set of relevant essential medicines available and affordable on a sustainable basis",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/3.b.3",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.b"
                ],
                "indicator": [
                    "3.b.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_HLF_EMED",
                "description": "Proportion of health facilities that have a core set of relevant essential medicines available and affordable on a sustainable basis (%)",
                "uri": "/v1/sdg/Series/SH_HLF_EMED"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.c",
        "code": "3.c.1",
        "description": "Health worker density and distribution",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.c.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.c"
                ],
                "indicator": [
                    "3.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_MED_DEN",
                "description": "Health worker density, by type of occupation (per 10,000 population)",
                "uri": "/v1/sdg/Series/SH_MED_DEN"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.c"
                ],
                "indicator": [
                    "3.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_MED_HWRKDIS",
                "description": "Health worker distribution, by sex and type of occupation (%)",
                "uri": "/v1/sdg/Series/SH_MED_HWRKDIS"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.d",
        "code": "3.d.1",
        "description": "International Health Regulations (IHR) capacity and health emergency preparedness",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/3.d.1",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.d"
                ],
                "indicator": [
                    "3.d.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_IHR_CAPS",
                "description": "International Health Regulations (IHR) capacity, by type of IHR capacity (%)",
                "uri": "/v1/sdg/Series/SH_IHR_CAPS"
            }
        ]
    },
    {
        "goal": "3",
        "target": "3.d",
        "code": "3.d.2",
        "description": "Percentage of bloodstream infections due to selected antimicrobial-resistant organisms",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/3.d.2",
        "series": [
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.d"
                ],
                "indicator": [
                    "3.d.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_BLD_MRSA",
                "description": "Percentage of bloodstream infection due to methicillin-resistant Staphylococcus aureus (MRSA) among patients seeking care and whose blood sample is taken and tested (%)",
                "uri": "/v1/sdg/Series/SH_BLD_MRSA"
            },
            {
                "goal": [
                    "3"
                ],
                "target": [
                    "3.d"
                ],
                "indicator": [
                    "3.d.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_BLD_ECOLI",
                "description": "Percentage of bloodstream infection due to Escherichia coli resistant to 3rd-generation cephalosporin (e.g., ESBL- E. coli) among patients seeking care and whose blood sample is taken and tested (%)",
                "uri": "/v1/sdg/Series/SH_BLD_ECOLI"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.1",
        "code": "4.1.1",
        "description": "Proportion of children and young people (a) in grades 2/3; (b) at the end of primary; and (c) at the end of lower secondary achieving at least a minimum proficiency level in (i) reading and (ii) mathematics, by sex",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/4.1.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.1"
                ],
                "indicator": [
                    "4.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_PRFL",
                "description": "Proportion of children and young people achieving a minimum proficiency level in reading and mathematics (%)",
                "uri": "/v1/sdg/Series/SE_TOT_PRFL"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.1",
        "code": "4.1.2",
        "description": "Completion rate (primary education, lower secondary education, upper secondary education)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/4.1.2",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.1"
                ],
                "indicator": [
                    "4.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_CPLR",
                "description": "Completion rate, by sex, location, wealth quintile and education level (%)",
                "uri": "/v1/sdg/Series/SE_TOT_CPLR"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.2",
        "code": "4.2.1",
        "description": "Proportion of children aged 24-59 months who are developmentally on track in health, learning and psychosocial well-being, by sex",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.2.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.2"
                ],
                "indicator": [
                    "4.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_DEV_ONTRK",
                "description": "Proportion of children aged 36???59 months who are developmentally on track in at least three of the following domains: literacy-numeracy, physical development, social-emotional development, and learning (% of children aged 36-59 months)",
                "uri": "/v1/sdg/Series/SE_DEV_ONTRK"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.2",
        "code": "4.2.2",
        "description": "Participation rate in organized learning (one year before the official primary entry age), by sex",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/4.2.2",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.2"
                ],
                "indicator": [
                    "4.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_PRE_PARTN",
                "description": "Participation rate in organized learning (one year before the official primary entry age), by sex (%)",
                "uri": "/v1/sdg/Series/SE_PRE_PARTN"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.3",
        "code": "4.3.1",
        "description": "Participation rate of youth and adults in formal and non-formal education and training in the previous 12 months, by sex",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.3.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.3"
                ],
                "indicator": [
                    "4.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ADT_EDUCTRN",
                "description": "Participation rate in formal and non-formal education and training, by sex (%)",
                "uri": "/v1/sdg/Series/SE_ADT_EDUCTRN"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.4",
        "code": "4.4.1",
        "description": "Proportion of youth and adults with information and communications technology (ICT) skills, by type of skill",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.4.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.4"
                ],
                "indicator": [
                    "4.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ADT_ACTS",
                "description": "Proportion of youth and adults with information and communications technology (ICT) skills, by sex and type of skill (%)",
                "uri": "/v1/sdg/Series/SE_ADT_ACTS"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.5",
        "code": "4.5.1",
        "description": "Parity indices (female/male, rural/urban, bottom/top wealth quintile and others such as disability status, indigenous peoples and conflict-affected, as data become available) for all education indicators on this list that can be disaggregated",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.5.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GPI_PTNPRE",
                "description": "Adjusted gender parity index for participation rate in organized learning (one year before the official primary entry age), (ratio)",
                "uri": "/v1/sdg/Series/SE_GPI_PTNPRE"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GPI_TCAQ",
                "description": "Adjusted gender parity index for the proportion of teachers with the minimum required qualifications, by education level (ratio)",
                "uri": "/v1/sdg/Series/SE_GPI_TCAQ"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GPI_PART",
                "description": "Adjusted gender parity index for participation rate in formal and non-formal education and training (ratio)",
                "uri": "/v1/sdg/Series/SE_GPI_PART"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GPI_ICTS",
                "description": "Gender parity index for youth/adults with information and communications technology (ICT) skills, by type of skill (ratio)",
                "uri": "/v1/sdg/Series/SE_GPI_ICTS"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_IMP_FPOF",
                "description": "Adjusted immigration status parity index for achieving at least a fixed level of proficiency in functional skills, by numeracy/literacy skills (ratio)",
                "uri": "/v1/sdg/Series/SE_IMP_FPOF"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_NAP_ACHI",
                "description": "Adjusted immigration status parity index for achieving a minimum proficiency level in reading and mathematics (ratio)",
                "uri": "/v1/sdg/Series/SE_NAP_ACHI"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_LGP_ACHI",
                "description": "Adjusted language test parity index for achieving a minimum proficiency level in reading and mathematics (ratio)",
                "uri": "/v1/sdg/Series/SE_LGP_ACHI"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_GPI",
                "description": "Adjusted gender parity index for achieving a minimum proficiency level in reading and mathematics (ratio)",
                "uri": "/v1/sdg/Series/SE_TOT_GPI"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_SESPI",
                "description": "Adjusted low to high socio-economic parity index for achieving a minimum proficiency level in reading and mathematics (ratio)",
                "uri": "/v1/sdg/Series/SE_TOT_SESPI"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_RUPI",
                "description": "Adjusted rural to urban parity index for achieving a minimum proficiency level in reading and mathematics (ratio)",
                "uri": "/v1/sdg/Series/SE_TOT_RUPI"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ALP_CPLR",
                "description": "Adjusted location parity index for completion rate, by sex, wealth quintile and education level",
                "uri": "/v1/sdg/Series/SE_ALP_CPLR"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_AWP_CPRA",
                "description": "Adjusted wealth parity index for completion rate, by sex, location and education level",
                "uri": "/v1/sdg/Series/SE_AWP_CPRA"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_AGP_CPRA",
                "description": "Adjusted gender parity index for completion rate, by location, wealth quintile and education level",
                "uri": "/v1/sdg/Series/SE_AGP_CPRA"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_GPI_FS",
                "description": "Adjusted gender parity index for achieving at least a fixed level of proficiency in functional skills, by numeracy/literacy skills (ratio)",
                "uri": "/v1/sdg/Series/SE_TOT_GPI_FS"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.5"
                ],
                "indicator": [
                    "4.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TOT_SESPI_FS",
                "description": "Adjusted low to high socio-economic parity status index for achieving at least a fixed level of proficiency in functional skills, by numeracy/literacy skills (ratio)",
                "uri": "/v1/sdg/Series/SE_TOT_SESPI_FS"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.6",
        "code": "4.6.1",
        "description": "Proportion of population in a given age group achieving at least a fixed level of proficiency in functional (a) literacy and (b) numeracy skills, by sex",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.6.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.6"
                ],
                "indicator": [
                    "4.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ADT_FUNS",
                "description": "Proportion of population achieving at least a fixed level of proficiency in functional skills, by sex, age and type of skill (%)",
                "uri": "/v1/sdg/Series/SE_ADT_FUNS"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.7",
        "code": "4.7.1",
        "description": "Extent to which (i) global citizenship education and (ii) education for sustainable development are mainstreamed in (a) national education policies; (b) curricula; (c) teacher education; and (d) student assessment",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.7.1",
        "series": [
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_NEP",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in national education policies",
                "uri": "/v1/sdg/Series/SE_GCEDESD_NEP"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_CUR",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in curricula",
                "uri": "/v1/sdg/Series/SE_GCEDESD_CUR"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_TED",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in teacher education",
                "uri": "/v1/sdg/Series/SE_GCEDESD_TED"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_SAS",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in student assessment",
                "uri": "/v1/sdg/Series/SE_GCEDESD_SAS"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.a",
        "code": "4.a.1",
        "description": "Proportion of schools offering basic services, by type of service",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/4.a.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ACS_CMPTR",
                "description": "Proportion of schools with access to computers for pedagogical purposes, by education level (%)",
                "uri": "/v1/sdg/Series/SE_ACS_CMPTR"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ACS_H2O",
                "description": "Proportion of schools with access to basic drinking water, by education level (%)",
                "uri": "/v1/sdg/Series/SE_ACS_H2O"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ACS_ELECT",
                "description": "Proportion of schools with access to electricity, by education level (%)",
                "uri": "/v1/sdg/Series/SE_ACS_ELECT"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ACC_HNDWSH",
                "description": "Proportion of schools with basic handwashing facilities, by education level (%)",
                "uri": "/v1/sdg/Series/SE_ACC_HNDWSH"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ACS_INTNT",
                "description": "Proportion of schools with access to the internet for pedagogical purposes, by education level (%)",
                "uri": "/v1/sdg/Series/SE_ACS_INTNT"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_ACS_SANIT",
                "description": "Proportion of schools with access to access to single-sex basic sanitation, by education level (%)",
                "uri": "/v1/sdg/Series/SE_ACS_SANIT"
            },
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.a"
                ],
                "indicator": [
                    "4.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_INF_DSBL",
                "description": "Proportion of schools with access to adapted infrastructure and materials for students with disabilities, by education level (%)",
                "uri": "/v1/sdg/Series/SE_INF_DSBL"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.b",
        "code": "4.b.1",
        "description": "Volume of official development assistance flows for scholarships by sector and type of study",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/4.b.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.b"
                ],
                "indicator": [
                    "4.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_SCHIPSL",
                "description": "Total official flows for scholarships, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_SCHIPSL"
            }
        ]
    },
    {
        "goal": "4",
        "target": "4.c",
        "code": "4.c.1",
        "description": "Proportion of teachers with the minimum required qualifications, by education level",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/4.c.1",
        "series": [
            {
                "goal": [
                    "4"
                ],
                "target": [
                    "4.c"
                ],
                "indicator": [
                    "4.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_TRA_GRDL",
                "description": "Proportion of teachers with the minimum required qualifications, by education level and sex (%)",
                "uri": "/v1/sdg/Series/SE_TRA_GRDL"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.1",
        "code": "5.1.1",
        "description": "Whether or not legal frameworks are in place to promote, enforce and monitor equality and non???discrimination on the basis of sex",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.1.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.1"
                ],
                "indicator": [
                    "5.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_LGL_GENEQLFP",
                "description": "Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) -- Area 1: overarching legal frameworks and public life",
                "uri": "/v1/sdg/Series/SG_LGL_GENEQLFP"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.1"
                ],
                "indicator": [
                    "5.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_LGL_GENEQVAW",
                "description": "Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) --  Area 2: violence against women",
                "uri": "/v1/sdg/Series/SG_LGL_GENEQVAW"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.1"
                ],
                "indicator": [
                    "5.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_LGL_GENEQEMP",
                "description": "Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) -- Area 3: employment and economic benefits",
                "uri": "/v1/sdg/Series/SG_LGL_GENEQEMP"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.1"
                ],
                "indicator": [
                    "5.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_LGL_GENEQMAR",
                "description": "Legal frameworks that promote, enforce and monitor gender equality (percentage of achievement, 0 - 100) -- Area 4: marriage and family",
                "uri": "/v1/sdg/Series/SG_LGL_GENEQMAR"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.2",
        "code": "5.2.1",
        "description": "Proportion of ever-partnered women and girls aged 15 years and older subjected to physical, sexual or psychological violence by a current or former intimate partner in the previous 12 months, by form of violence and by age",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/5.2.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.2"
                ],
                "indicator": [
                    "5.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VAW_MARR",
                "description": "Proportion of ever-partnered women and girls subjected to physical and/or sexual violence by a current or former intimate partner in the previous 12 months, by age (%)",
                "uri": "/v1/sdg/Series/VC_VAW_MARR"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.2",
        "code": "5.2.2",
        "description": "Proportion of women and girls aged 15 years and older subjected to sexual violence by persons other than an intimate partner in the previous 12 months, by age and place of occurrence",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.2.2",
        "series": []
    },
    {
        "goal": "5",
        "target": "5.3",
        "code": "5.3.1",
        "description": "Proportion of women aged 20-24 years who were married or in a union before age 15 and before age 18",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/5.3.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.3"
                ],
                "indicator": [
                    "5.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_DYN_MRBF18",
                "description": "Proportion of women aged 20-24 years who were married or in a union before age 18 (%)",
                "uri": "/v1/sdg/Series/SP_DYN_MRBF18"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.3"
                ],
                "indicator": [
                    "5.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_DYN_MRBF15",
                "description": "Proportion of women aged 20-24 years who were married or in a union before age 15 (%)",
                "uri": "/v1/sdg/Series/SP_DYN_MRBF15"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.3",
        "code": "5.3.2",
        "description": "Proportion of girls and women aged 15-49 years who have undergone female genital mutilation/cutting, by age",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/5.3.2",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.3"
                ],
                "indicator": [
                    "5.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_STA_FGMS",
                "description": "Proportion of girls and women aged 15-49 years who have undergone female genital mutilation/cutting, by age (%)",
                "uri": "/v1/sdg/Series/SH_STA_FGMS"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.4",
        "code": "5.4.1",
        "description": "Proportion of time spent on unpaid domestic and care work, by sex, age and location",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.4.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.4"
                ],
                "indicator": [
                    "5.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_DOM_TSPDCW",
                "description": "Proportion of time spent on unpaid care work, by sex, age and location (%)",
                "uri": "/v1/sdg/Series/SL_DOM_TSPDCW"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.4"
                ],
                "indicator": [
                    "5.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_DOM_TSPDDC",
                "description": "Proportion of time spent on unpaid domestic chores, by sex, age and location (%)",
                "uri": "/v1/sdg/Series/SL_DOM_TSPDDC"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.4"
                ],
                "indicator": [
                    "5.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_DOM_TSPD",
                "description": "Proportion of time spent on unpaid domestic chores and care work, by sex, age and location (%)",
                "uri": "/v1/sdg/Series/SL_DOM_TSPD"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.5",
        "code": "5.5.1",
        "description": "Proportion of seats held by women in (a) national parliaments and (b) local governments",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/5.5.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.5"
                ],
                "indicator": [
                    "5.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GEN_PARLN",
                "description": "Number of seats held by women in national parliaments (number)",
                "uri": "/v1/sdg/Series/SG_GEN_PARLN"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.5"
                ],
                "indicator": [
                    "5.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GEN_PARLNT",
                "description": "Current number of seats in national parliaments (number)",
                "uri": "/v1/sdg/Series/SG_GEN_PARLNT"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.5"
                ],
                "indicator": [
                    "5.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GEN_PARL",
                "description": "Proportion of seats held by women in national parliaments (% of total number of seats)",
                "uri": "/v1/sdg/Series/SG_GEN_PARL"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.5"
                ],
                "indicator": [
                    "5.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GEN_LOCGELS",
                "description": "Proportion of elected seats held by women in deliberative bodies of local government (%)",
                "uri": "/v1/sdg/Series/SG_GEN_LOCGELS"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.5",
        "code": "5.5.2",
        "description": "Proportion of women in managerial positions",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/5.5.2",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.5"
                ],
                "indicator": [
                    "5.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IC_GEN_MGTL",
                "description": "Proportion of women in managerial positions (%)",
                "uri": "/v1/sdg/Series/IC_GEN_MGTL"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.5"
                ],
                "indicator": [
                    "5.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IC_GEN_MGTN",
                "description": "Proportion of women in senior and middle management positions (%)",
                "uri": "/v1/sdg/Series/IC_GEN_MGTN"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.6",
        "code": "5.6.1",
        "description": "Proportion of women aged 15-49 years who make their own informed decisions regarding sexual relations, contraceptive use and reproductive health care",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.6.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_FPL_INFM",
                "description": "Proportion of women who make their own informed decisions regarding sexual relations, contraceptive use and reproductive health care (% of women aged 15-49 years)",
                "uri": "/v1/sdg/Series/SH_FPL_INFM"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_FPL_INFMSR",
                "description": "Proportion of women who make their own informed decisions regarding sexual relations (% of women aged 15-49 years)",
                "uri": "/v1/sdg/Series/SH_FPL_INFMSR"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_FPL_INFMCU",
                "description": "Proportion of women who make their own informed decisions regarding contraceptive use (% of women aged 15-49 years)",
                "uri": "/v1/sdg/Series/SH_FPL_INFMCU"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_FPL_INFMRH",
                "description": "Proportion of women who make their own informed decisions regarding reproductive health care (% of women aged 15-49 years)",
                "uri": "/v1/sdg/Series/SH_FPL_INFMRH"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.6",
        "code": "5.6.2",
        "description": "Number of countries with laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.6.2",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHE",
                "description": "Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHE"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC1",
                "description": "(S.1.C.1) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 1: Maternity Care (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC1"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC10",
                "description": "(S.4.C.10) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 10: HIV Counselling and Test Services",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC10"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC11",
                "description": "(S.4.C.11) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 11: HIV Treatment and Care Services (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC11"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC12",
                "description": "(S.4.C.12) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 12: HIV Confidentiality (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC12"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC13",
                "description": "(S.4.C.13) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 13: HPV Vaccine (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC13"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC2",
                "description": "(S.1.C.2) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 2: Life Saving Commodities (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC2"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC3",
                "description": "(S.1.C.3) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 3: Abortion",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC3"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC4",
                "description": "(S.1.C.4) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 4: Post-Abortion Care (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC4"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC5",
                "description": "(S.2.C.5) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 5: Contraceptive Services (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC5"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC6",
                "description": "(S.2.C.6) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 6: Contraceptive Consent (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC6"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC7",
                "description": "(S.2.C.7) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 7: Emergency Contraception (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC7"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC8",
                "description": "(S.3.C.8) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 8: Sexuality Education Curriculum Laws (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC8"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHEC9",
                "description": "(S.3.C.9) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Component 9: Sexuality Education Curriculum Topics (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHEC9"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHES1",
                "description": "(S.1) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Section 1: Maternity Care (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHES1"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHES2",
                "description": "(S.2) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Section 2: Contraceptive and Family Planning (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHES2"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHES3",
                "description": "(S.3) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Section 3: Sexuality Education (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHES3"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.6"
                ],
                "indicator": [
                    "5.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_LGR_ACSRHES4",
                "description": "(S.4) Extent to which countries have laws and regulations that guarantee full and equal access to women and men aged 15 years and older to sexual and reproductive health care, information and education: Section 4: HIV and HPV (%)",
                "uri": "/v1/sdg/Series/SH_LGR_ACSRHES4"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.a",
        "code": "5.a.1",
        "description": "(a) Proportion of total agricultural population with ownership or secure rights over agricultural land, by sex; and (b) share of women among owners or rights-bearers of agricultural land, by type of tenure",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.a.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.a"
                ],
                "indicator": [
                    "5.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_LGL_LNDAGSEC",
                "description": "Proportion of people with ownership or secure rights over agricultural land (out of total agricultural population), by sex (%)",
                "uri": "/v1/sdg/Series/SP_LGL_LNDAGSEC"
            },
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.a"
                ],
                "indicator": [
                    "5.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_GNP_WNOWNS",
                "description": "Share of women among owners or rights-bearers of agricultural land, by type of tenure (%)",
                "uri": "/v1/sdg/Series/SP_GNP_WNOWNS"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.a",
        "code": "5.a.2",
        "description": "Proportion of countries where the legal framework (including customary law) guarantees women???s equal rights to land ownership and/or control",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.a.2",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.a"
                ],
                "indicator": [
                    "5.a.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_LGL_LNDFEMOD",
                "description": "Degree to which the legal framework (including customary law) guarantees women???s equal rights to land ownership and/or control (1=No evidence to 6=Highest levels of guarantees)",
                "uri": "/v1/sdg/Series/SG_LGL_LNDFEMOD"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.b",
        "code": "5.b.1",
        "description": "Proportion of individuals who own a mobile telephone, by sex",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.b.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.b"
                ],
                "indicator": [
                    "5.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_MOB_OWN",
                "description": "Proportion of individuals who own a mobile telephone, by sex (%)",
                "uri": "/v1/sdg/Series/IT_MOB_OWN"
            }
        ]
    },
    {
        "goal": "5",
        "target": "5.c",
        "code": "5.c.1",
        "description": "Proportion of countries with systems to track and make public allocations for gender equality and women???s empowerment",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/5.c.1",
        "series": [
            {
                "goal": [
                    "5"
                ],
                "target": [
                    "5.c"
                ],
                "indicator": [
                    "5.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GEN_EQPWN",
                "description": "Proportion of countries with systems to track and make public allocations for gender equality and women's empowerment (%)",
                "uri": "/v1/sdg/Series/SG_GEN_EQPWN"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.1",
        "code": "6.1.1",
        "description": "Proportion of population using safely managed drinking water services",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.1.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.1"
                ],
                "indicator": [
                    "6.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_H2O_SAFE",
                "description": "Proportion of population using safely managed drinking water services, by urban/rural (%)",
                "uri": "/v1/sdg/Series/SH_H2O_SAFE"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.2",
        "code": "6.2.1",
        "description": "Proportion of population using (a) safely managed sanitation services and (b) a hand-washing facility with soap and water",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/6.2.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.2"
                ],
                "indicator": [
                    "6.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_SAN_HNDWSH",
                "description": "Proportion of population with basic handwashing facilities on premises, by urban/rural (%)",
                "uri": "/v1/sdg/Series/SH_SAN_HNDWSH"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.2"
                ],
                "indicator": [
                    "6.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_SAN_SAFE",
                "description": "Proportion of population using safely managed sanitation services, by urban/rural (%)",
                "uri": "/v1/sdg/Series/SH_SAN_SAFE"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.2"
                ],
                "indicator": [
                    "6.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SH_SAN_DEFECT",
                "description": "Proportion of population practicing open defecation, by urban/rural (%)",
                "uri": "/v1/sdg/Series/SH_SAN_DEFECT"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.3",
        "code": "6.3.2",
        "description": "Proportion of bodies of water with good ambient water quality",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/6.3.2",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_H2O_OPAMBQ",
                "description": "Proportion of open water bodies with good ambient water quality (%)",
                "uri": "/v1/sdg/Series/EN_H2O_OPAMBQ"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_H2O_RVAMBQ",
                "description": "Proportion of river water bodies with good ambient water quality (%)",
                "uri": "/v1/sdg/Series/EN_H2O_RVAMBQ"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_H2O_GRAMBQ",
                "description": "Proportion of groundwater bodies with good ambient water quality (%)",
                "uri": "/v1/sdg/Series/EN_H2O_GRAMBQ"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_H2O_WBAMBQ",
                "description": "Proportion of bodies of water with good ambient water quality (%)",
                "uri": "/v1/sdg/Series/EN_H2O_WBAMBQ"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.3",
        "code": "6.3.1",
        "description": "Proportion of domestic and industrial wastewater flows safely treated",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/6.3.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WWT_WWDS",
                "description": "Proportion of safely treated domestic wastewater flows (%)",
                "uri": "/v1/sdg/Series/EN_WWT_WWDS"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WWT_GEN",
                "description": "Total wastewater generated (million m3/year)",
                "uri": "/v1/sdg/Series/EN_WWT_GEN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WWT_TREAT",
                "description": "Total wastewater treated (million m3/year)",
                "uri": "/v1/sdg/Series/EN_WWT_TREAT"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.3"
                ],
                "indicator": [
                    "6.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WWT_TREATR",
                "description": "Proportion of wastewater treated, by activity and location (%)",
                "uri": "/v1/sdg/Series/EN_WWT_TREATR"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.4",
        "code": "6.4.2",
        "description": "Level of water stress: freshwater withdrawal as a proportion of available freshwater resources",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.4.2",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.4"
                ],
                "indicator": [
                    "6.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_STRESS",
                "description": "Level of water stress: freshwater withdrawal as a proportion of available freshwater resources (%)",
                "uri": "/v1/sdg/Series/ER_H2O_STRESS"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.4",
        "code": "6.4.1",
        "description": "Change in water-use efficiency over time",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.4.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.4"
                ],
                "indicator": [
                    "6.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_WUEYST",
                "description": "Water Use Efficiency (United States dollars per cubic meter)",
                "uri": "/v1/sdg/Series/ER_H2O_WUEYST"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.5",
        "code": "6.5.1",
        "description": "Degree of integrated water resources management",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.5.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_IWRMD",
                "description": "Degree of integrated water resources management implementation (%)",
                "uri": "/v1/sdg/Series/ER_H2O_IWRMD"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_IWRMP",
                "description": "Proportion of countries by IWRM implementation category (%)",
                "uri": "/v1/sdg/Series/ER_H2O_IWRMP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_IWRMD_EE",
                "description": "Degree of integrated water resources management implementation, enabling environment (%)",
                "uri": "/v1/sdg/Series/ER_H2O_IWRMD_EE"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_IWRMD_IP",
                "description": "Degree of integrated water resources management implementation, institutions and participation (%)",
                "uri": "/v1/sdg/Series/ER_H2O_IWRMD_IP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_IWRMD_MI",
                "description": "Degree of integrated water resources management implementation, management instruments (%)",
                "uri": "/v1/sdg/Series/ER_H2O_IWRMD_MI"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_IWRMD_FI",
                "description": "Degree of integrated water resources management implementation, financing (%)",
                "uri": "/v1/sdg/Series/ER_H2O_IWRMD_FI"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.5",
        "code": "6.5.2",
        "description": "Proportion of transboundary basin area with an operational arrangement for water cooperation",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.5.2",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_TBA_H2CO",
                "description": "Proportion of transboundary basins (river and lake basins and aquifers) with an operational arrangement for water cooperation (%)",
                "uri": "/v1/sdg/Series/EG_TBA_H2CO"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_TBA_H2COAQ",
                "description": "Proportion of transboundary aquifers with an operational arrangement for water cooperation (%)",
                "uri": "/v1/sdg/Series/EG_TBA_H2COAQ"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.5"
                ],
                "indicator": [
                    "6.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_TBA_H2CORL",
                "description": "Proportion of transboundary river and lake basins with an operational arrangement for water cooperation (%)",
                "uri": "/v1/sdg/Series/EG_TBA_H2CORL"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.6",
        "code": "6.6.1",
        "description": "Change in the extent of water-related ecosystems over time",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.6.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_NDQTGRW",
                "description": "Nationally derived quantity of groundwater (millions of cubic metres per annum)",
                "uri": "/v1/sdg/Series/EN_WBE_NDQTGRW"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_NDQTRVR",
                "description": "Nationally derived quantity of rivers (million of cubic metres per annum)",
                "uri": "/v1/sdg/Series/EN_WBE_NDQTRVR"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_HMWTL",
                "description": "Extent of human made wetlands (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_HMWTL"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_INWTL",
                "description": "Extent of inland wetlands (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_INWTL"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKRV_PWAN",
                "description": "Lakes and rivers permanent water area (square kilometres)",
                "uri": "/v1/sdg/Series/EN_LKRV_PWAN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKRV_PWAP",
                "description": "Lakes and rivers permanent water area (% of total land area)",
                "uri": "/v1/sdg/Series/EN_LKRV_PWAP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKRV_SWAN",
                "description": "Lakes and rivers seasonal water area (square kilometres)",
                "uri": "/v1/sdg/Series/EN_LKRV_SWAN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKRV_SWAP",
                "description": "Lakes and rivers seasonal water area (% of total land area)",
                "uri": "/v1/sdg/Series/EN_LKRV_SWAP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKRV_PWAC",
                "description": "Lakes and rivers permanent water area change (%)",
                "uri": "/v1/sdg/Series/EN_LKRV_PWAC"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKRV_SWAC",
                "description": "Lakes and rivers seasonal water area change (%)",
                "uri": "/v1/sdg/Series/EN_LKRV_SWAC"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_RSRV_MNWAN",
                "description": "Reservoir minimum water area (square kilometres)",
                "uri": "/v1/sdg/Series/EN_RSRV_MNWAN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_RSRV_MNWAP",
                "description": "Reservoir minimum water area (% of total land area)",
                "uri": "/v1/sdg/Series/EN_RSRV_MNWAP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_RSRV_MXWAN",
                "description": "Reservoir maximum water area (square kilometres)",
                "uri": "/v1/sdg/Series/EN_RSRV_MXWAN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_RSRV_MXWAP",
                "description": "Reservoir maximum water area (% of total land area)",
                "uri": "/v1/sdg/Series/EN_RSRV_MXWAP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_WTLN",
                "description": "Wetlands area (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_WTLN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_WTLP",
                "description": "Wetlands area (% of total land area)",
                "uri": "/v1/sdg/Series/EN_WBE_WTLP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKW_QLTRB",
                "description": "Lake water quality turbidity (%)",
                "uri": "/v1/sdg/Series/EN_LKW_QLTRB"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LKW_QLTRST",
                "description": "Lake water quality trophic state (%)",
                "uri": "/v1/sdg/Series/EN_LKW_QLTRST"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGN",
                "description": "Mangrove area (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGBN",
                "description": "Mangrove area baseline (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGBN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGGN",
                "description": "Mangrove area gain (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGGN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGGP",
                "description": "Mangrove area gain (%)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGGP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGLN",
                "description": "Mangrove area loss (square kilometres)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGLN"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGLP",
                "description": "Mangrove area loss (%)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGLP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.6"
                ],
                "indicator": [
                    "6.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_WBE_MANGC",
                "description": "Mangrove total area change (%)",
                "uri": "/v1/sdg/Series/EN_WBE_MANGC"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.a",
        "code": "6.a.1",
        "description": "Amount of water- and sanitation-related official development assistance that is part of a government-coordinated spending plan",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.a.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.a"
                ],
                "indicator": [
                    "6.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_WASHL",
                "description": "Total official development assistance (gross disbursement) for water supply and sanitation, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_WASHL"
            }
        ]
    },
    {
        "goal": "6",
        "target": "6.b",
        "code": "6.b.1",
        "description": "Proportion of local administrative units with established and operational policies and procedures for participation of local communities in water and sanitation management",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/6.b.1",
        "series": [
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_WAT_PROCED",
                "description": "Proportion of countries with clearly defined procedures in law or policy for participation by service users/communities in planning program in water resources planning and management (%)",
                "uri": "/v1/sdg/Series/ER_WAT_PROCED"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_PARTIC",
                "description": "Proportion of countries with high level of users/communities participating in planning programs in rural drinking-water supply (%)",
                "uri": "/v1/sdg/Series/ER_H2O_PARTIC"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_PROCED",
                "description": "Proportion of countries with clearly defined procedures in law or policy for participation by service users/communities in planning program in rural drinking-water supply (%)",
                "uri": "/v1/sdg/Series/ER_H2O_PROCED"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_WAT_PARTIC",
                "description": "Proportion of countries with high level of users/communities participating in planning programs in water resources planning and management (%)",
                "uri": "/v1/sdg/Series/ER_WAT_PARTIC"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_RURP",
                "description": "Countries with users/communities participating in planning programs in rural drinking-water supply, by level of participation (3 = High; 2 = Moderate; 1 = Low; 0 = NA)",
                "uri": "/v1/sdg/Series/ER_H2O_RURP"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_PRDU",
                "description": "Countries with procedures in law or policy for participation by service users/communities in planning program in rural drinking-water supply, by level of definition in procedures (10 = Clearly defined; 5 = Not clearly defined ; 0 = NA)",
                "uri": "/v1/sdg/Series/ER_H2O_PRDU"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_WAT_PART",
                "description": "Countries with users/communities participating in planning programs in water resources planning and management, by level of participation (3 = High; 2 = Moderate; 1 = Low; 0 = NA)",
                "uri": "/v1/sdg/Series/ER_WAT_PART"
            },
            {
                "goal": [
                    "6"
                ],
                "target": [
                    "6.b"
                ],
                "indicator": [
                    "6.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_WAT_PRDU",
                "description": "Countries with procedures in law or policy for participation by service users/communities in planning program in water resources planning and management, by level of definition in procedures (10 = Clearly defined; 5 = Not clearly defined ; 0 = NA)",
                "uri": "/v1/sdg/Series/ER_WAT_PRDU"
            }
        ]
    },
    {
        "goal": "7",
        "target": "7.1",
        "code": "7.1.1",
        "description": "Proportion of population with access to electricity",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/7.1.1",
        "series": [
            {
                "goal": [
                    "7"
                ],
                "target": [
                    "7.1"
                ],
                "indicator": [
                    "7.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_ACS_ELEC",
                "description": "Proportion of population with access to electricity, by urban/rural (%)",
                "uri": "/v1/sdg/Series/EG_ACS_ELEC"
            }
        ]
    },
    {
        "goal": "7",
        "target": "7.1",
        "code": "7.1.2",
        "description": "Proportion of population with primary reliance on clean fuels and technology",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/7.1.2",
        "series": [
            {
                "goal": [
                    "7"
                ],
                "target": [
                    "7.1"
                ],
                "indicator": [
                    "7.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_EGY_CLEAN",
                "description": "Proportion of population with primary reliance on clean fuels and technology (%)",
                "uri": "/v1/sdg/Series/EG_EGY_CLEAN"
            }
        ]
    },
    {
        "goal": "7",
        "target": "7.2",
        "code": "7.2.1",
        "description": "Renewable energy share in the total final energy consumption",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/7.2.1",
        "series": [
            {
                "goal": [
                    "7"
                ],
                "target": [
                    "7.2"
                ],
                "indicator": [
                    "7.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_FEC_RNEW",
                "description": "Renewable energy share in the total final energy consumption (%)",
                "uri": "/v1/sdg/Series/EG_FEC_RNEW"
            }
        ]
    },
    {
        "goal": "7",
        "target": "7.3",
        "code": "7.3.1",
        "description": "Energy intensity measured in terms of primary energy and GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/7.3.1",
        "series": [
            {
                "goal": [
                    "7"
                ],
                "target": [
                    "7.3"
                ],
                "indicator": [
                    "7.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_EGY_PRIM",
                "description": "Energy intensity level of primary energy (megajoules per constant 2017 purchasing power parity GDP)",
                "uri": "/v1/sdg/Series/EG_EGY_PRIM"
            }
        ]
    },
    {
        "goal": "7",
        "target": "7.a",
        "code": "7.a.1",
        "description": "International financial flows to developing countries in support of clean energy research and development and renewable energy production, including in hybrid systems",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/7.a.1",
        "series": [
            {
                "goal": [
                    "7"
                ],
                "target": [
                    "7.a"
                ],
                "indicator": [
                    "7.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_IFF_RANDN",
                "description": "International financial flows to developing countries in support of clean energy research and development and renewable energy production, including in hybrid systems (millions of constant United States dollars)",
                "uri": "/v1/sdg/Series/EG_IFF_RANDN"
            }
        ]
    },
    {
        "goal": "7",
        "target": "7.b",
        "code": "7.b.1",
        "description": "Installed renewable energy-generating capacity in developing countries (in watts per capita)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/7.b.1",
        "series": [
            {
                "goal": [
                    "7",
                    "12"
                ],
                "target": [
                    "7.b",
                    "12.a"
                ],
                "indicator": [
                    "7.b.1",
                    "12.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_EGY_RNEW",
                "description": "Installed renewable electricity-generating capacity (watts per capita)",
                "uri": "/v1/sdg/Series/EG_EGY_RNEW"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.2",
        "code": "8.2.1",
        "description": "Annual growth rate of real GDP per employed person",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.2.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.2"
                ],
                "indicator": [
                    "8.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_EMP_PCAP",
                "description": "Annual growth rate of real GDP per employed person (%)",
                "uri": "/v1/sdg/Series/SL_EMP_PCAP"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.3",
        "code": "8.3.1",
        "description": "Proportion of informal employment in total employment, by sector and sex",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.3.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.3"
                ],
                "indicator": [
                    "8.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_ISV_IFEM",
                "description": "Proportion of informal employment, by sector and sex (ILO harmonized estimates) (%)",
                "uri": "/v1/sdg/Series/SL_ISV_IFEM"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.4",
        "code": "8.4.1",
        "description": "Material footprint, material footprint per capita, and material footprint per GDP",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.4.1",
        "series": [
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.1",
                    "8.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_FTPRPG",
                "description": "Material footprint per unit of GDP, by type of raw material (kilograms per constant 2015 United States dollar)",
                "uri": "/v1/sdg/Series/EN_MAT_FTPRPG"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.1",
                    "8.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_FTPRPC",
                "description": "Material footprint per capita, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_FTPRPC"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.1",
                    "8.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_FTPRTN",
                "description": "Material footprint, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_FTPRTN"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.4",
        "code": "8.4.2",
        "description": "Domestic material consumption, domestic material consumption per capita, and domestic material consumption per GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.4.2",
        "series": [
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.2",
                    "8.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_DOMCMPT",
                "description": "Domestic material consumption, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_DOMCMPT"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.2",
                    "8.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_DOMCMPG",
                "description": "Domestic material consumption per unit of GDP, by type of raw material (kilograms per constant 2015 United States dollars)",
                "uri": "/v1/sdg/Series/EN_MAT_DOMCMPG"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.2",
                    "8.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_DOMCMPC",
                "description": "Domestic material consumption per capita, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_DOMCMPC"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.5",
        "code": "8.5.1",
        "description": "Average hourly earnings of employees, by sex, age, occupation and persons with disabilities",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.5.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.5"
                ],
                "indicator": [
                    "8.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_EMP_EARN",
                "description": "Average hourly earnings of employees by sex and occupation (local currency)",
                "uri": "/v1/sdg/Series/SL_EMP_EARN"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.5",
        "code": "8.5.2",
        "description": "Unemployment rate, by sex, age and persons with disabilities",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.5.2",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.5"
                ],
                "indicator": [
                    "8.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_TLF_UEM",
                "description": "Unemployment rate, by sex and age (%)",
                "uri": "/v1/sdg/Series/SL_TLF_UEM"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.5"
                ],
                "indicator": [
                    "8.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_TLF_UEMDIS",
                "description": "Unemployment rate, by sex and disability (%)",
                "uri": "/v1/sdg/Series/SL_TLF_UEMDIS"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.6",
        "code": "8.6.1",
        "description": "Proportion of youth (aged 15-24 years) not in education, employment or training",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.6.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.6"
                ],
                "indicator": [
                    "8.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_TLF_NEET",
                "description": "Proportion of youth not in education, employment or training, by sex and age (%)",
                "uri": "/v1/sdg/Series/SL_TLF_NEET"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.7",
        "code": "8.7.1",
        "description": "Proportion and number of children aged 5-17 years engaged in child labour, by sex and age",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.7.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.7"
                ],
                "indicator": [
                    "8.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_TLF_CHLDEC",
                "description": "Proportion of children engaged in economic activity and household chores, by sex and age (%)",
                "uri": "/v1/sdg/Series/SL_TLF_CHLDEC"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.7"
                ],
                "indicator": [
                    "8.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_TLF_CHLDEA",
                "description": "Proportion of children engaged in economic activity, by sex and age  (%)",
                "uri": "/v1/sdg/Series/SL_TLF_CHLDEA"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.1",
        "code": "8.1.1",
        "description": "Annual growth rate of real GDP per capita",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.1.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.1"
                ],
                "indicator": [
                    "8.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NY_GDP_PCAP",
                "description": "Annual growth rate of real GDP per capita (%)",
                "uri": "/v1/sdg/Series/NY_GDP_PCAP"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.8",
        "code": "8.8.1",
        "description": "Fatal and non-fatal occupational injuries per 100,000 workers, by sex and migrant status",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.8.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.8"
                ],
                "indicator": [
                    "8.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_EMP_FTLINJUR",
                "description": "Fatal occupational injuries among employees, by sex and migrant status (per 100,000 employees)",
                "uri": "/v1/sdg/Series/SL_EMP_FTLINJUR"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.8"
                ],
                "indicator": [
                    "8.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_EMP_INJUR",
                "description": "Non-fatal occupational injuries among employees, by sex and migrant status (per 100,000 employees)",
                "uri": "/v1/sdg/Series/SL_EMP_INJUR"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.8",
        "code": "8.8.2",
        "description": "Level of national compliance with labour rights (freedom of association and collective bargaining) based on International Labour Organization (ILO) textual sources and national legislation, by sex and migrant status",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.8.2",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.8"
                ],
                "indicator": [
                    "8.8.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_LBR_NTLCPL",
                "description": "Level of national compliance with labour rights (freedom of association and collective bargaining) based on International Labour Organization (ILO) textual sources and national legislation",
                "uri": "/v1/sdg/Series/SL_LBR_NTLCPL"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.9",
        "code": "8.9.1",
        "description": "Tourism direct GDP as a proportion of total GDP and in growth rate",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.9.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.9"
                ],
                "indicator": [
                    "8.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ST_GDP_ZS",
                "description": "Tourism direct GDP as a proportion of total GDP (%)",
                "uri": "/v1/sdg/Series/ST_GDP_ZS"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.10",
        "code": "8.10.1",
        "description": "(a) Number of commercial bank branches per 100,000 adults and (b) number of automated teller machines (ATMs) per 100,000 adults",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.10.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.10"
                ],
                "indicator": [
                    "8.10.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FB_ATM_TOTL",
                "description": "Number of automated teller machines (ATMs) per 100,000 adults",
                "uri": "/v1/sdg/Series/FB_ATM_TOTL"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.10"
                ],
                "indicator": [
                    "8.10.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FB_CBK_BRCH",
                "description": "Number of commercial bank branches per 100,000 adults",
                "uri": "/v1/sdg/Series/FB_CBK_BRCH"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.10",
        "code": "8.10.2",
        "description": "Proportion of adults (15 years and older) with an account at a bank or other financial institution or with a mobile-money-service provider",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.10.2",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.10"
                ],
                "indicator": [
                    "8.10.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "FB_BNK_ACCSS",
                "description": "Proportion of adults (15 years and older) with an account at a financial institution or mobile-money-service provider, by sex (% of adults aged 15 years and older)",
                "uri": "/v1/sdg/Series/FB_BNK_ACCSS"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.10"
                ],
                "indicator": [
                    "8.10.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "FB_BNK_ACCSS_ILF",
                "description": "Proportion of adults (15 years and older) active in labor force with an account at a financial institution or mobile-money-service provider (% of adults aged 15 years and older)",
                "uri": "/v1/sdg/Series/FB_BNK_ACCSS_ILF"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.10"
                ],
                "indicator": [
                    "8.10.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "FB_BNK_ACCSS_OLF",
                "description": "Proportion of adults (15 years and older) out of labor force with an account at a financial institution or mobile-money-service provider (% of adults aged 15 years and older)",
                "uri": "/v1/sdg/Series/FB_BNK_ACCSS_OLF"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.a",
        "code": "8.a.1",
        "description": "Aid for Trade commitments and disbursements",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/8.a.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.a"
                ],
                "indicator": [
                    "8.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_TRDCMDL",
                "description": "Total official flows (commitments) for Aid for Trade, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_TRDCMDL"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.a"
                ],
                "indicator": [
                    "8.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_TRDDBMDL",
                "description": "Total official flows (disbursement) for Aid for Trade, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_TRDDBMDL"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.a"
                ],
                "indicator": [
                    "8.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_TRDDBML",
                "description": "Total official flows (disbursement) for Aid for Trade, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_TRDDBML"
            },
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.a"
                ],
                "indicator": [
                    "8.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_TRDCML",
                "description": "Total official flows (commitments) for Aid for Trade, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_TRDCML"
            }
        ]
    },
    {
        "goal": "8",
        "target": "8.b",
        "code": "8.b.1",
        "description": "Existence of a developed and operationalized national strategy for youth employment, as a distinct strategy or as part of a national employment strategy",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/8.b.1",
        "series": [
            {
                "goal": [
                    "8"
                ],
                "target": [
                    "8.b"
                ],
                "indicator": [
                    "8.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_CPA_YEMP",
                "description": "Existence of a developed and operationalized national strategy for youth employment, as a distinct strategy or as part of a national employment strategy",
                "uri": "/v1/sdg/Series/SL_CPA_YEMP"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.1",
        "code": "9.1.2",
        "description": "Passenger and freight volumes, by mode of transport",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.1.2",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.1"
                ],
                "indicator": [
                    "9.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IS_RDP_FRGVOL",
                "description": "Freight volume, by mode of transport (tonne kilometres)",
                "uri": "/v1/sdg/Series/IS_RDP_FRGVOL"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.1"
                ],
                "indicator": [
                    "9.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IS_RDP_PFVOL",
                "description": "Passenger volume (passenger kilometres), by mode of transport",
                "uri": "/v1/sdg/Series/IS_RDP_PFVOL"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.1"
                ],
                "indicator": [
                    "9.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IS_RDP_PORFVOL",
                "description": "Container port traffic, maritime transport (twenty-foot equivalent units - TEUs)",
                "uri": "/v1/sdg/Series/IS_RDP_PORFVOL"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.1"
                ],
                "indicator": [
                    "9.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IS_RDP_LULFRG",
                "description": "Freight loaded and unloaded, maritime transport (metric tons)",
                "uri": "/v1/sdg/Series/IS_RDP_LULFRG"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.1",
        "code": "9.1.1",
        "description": "Proportion of the rural population who live within 2 km of an all-season road",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/9.1.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.1"
                ],
                "indicator": [
                    "9.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_ROD_R2KM",
                "description": "Proportion of the rural population who live within 2 km of an all-season road",
                "uri": "/v1/sdg/Series/SP_ROD_R2KM"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.2",
        "code": "9.2.1",
        "description": "Manufacturing value added as a proportion of GDP and per capita",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.2.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.2"
                ],
                "indicator": [
                    "9.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NV_IND_MANFPC",
                "description": "Manufacturing value added per capita (constant 2015 United States dollars)",
                "uri": "/v1/sdg/Series/NV_IND_MANFPC"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.2"
                ],
                "indicator": [
                    "9.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NV_IND_MANF",
                "description": "Manufacturing value added (constant 2015 United States dollars) as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/NV_IND_MANF"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.2"
                ],
                "indicator": [
                    "9.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NV_IND_MANF_CD",
                "description": "Manufacturing value added (current United States dollars) as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/NV_IND_MANF_CD"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.2",
        "code": "9.2.2",
        "description": "Manufacturing employment as a proportion of total employment",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.2.2",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.2"
                ],
                "indicator": [
                    "9.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_TLF_MANF",
                "description": "Manufacturing employment as a proportion of total employment (%)",
                "uri": "/v1/sdg/Series/SL_TLF_MANF"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.3",
        "code": "9.3.1",
        "description": "Proportion of small-scale industries in total industry value added",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/9.3.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.3"
                ],
                "indicator": [
                    "9.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NV_IND_SSIS",
                "description": "Proportion of small-scale industries in total industry value added (%)",
                "uri": "/v1/sdg/Series/NV_IND_SSIS"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.3",
        "code": "9.3.2",
        "description": "Proportion of small-scale industries with a loan or line of credit",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.3.2",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.3"
                ],
                "indicator": [
                    "9.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "FC_ACC_SSID",
                "description": "Proportion of small-scale industries with a loan or line of credit (%)",
                "uri": "/v1/sdg/Series/FC_ACC_SSID"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.4",
        "code": "9.4.1",
        "description": "CO2 emission per unit of value added",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.4.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.4"
                ],
                "indicator": [
                    "9.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ATM_CO2",
                "description": "Carbon dioxide emissions from fuel combustion (millions of tonnes)",
                "uri": "/v1/sdg/Series/EN_ATM_CO2"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.4"
                ],
                "indicator": [
                    "9.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ATM_CO2MVA",
                "description": "Carbon dioxide emissions per unit of manufacturing value added (kilogrammes of CO2 per constant 2015 United States dollars)",
                "uri": "/v1/sdg/Series/EN_ATM_CO2MVA"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.4"
                ],
                "indicator": [
                    "9.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ATM_CO2GDP",
                "description": "Carbon dioxide emissions per unit of GDP PPP (kilogrammes of CO2 per constant 2017 United States dollars)",
                "uri": "/v1/sdg/Series/EN_ATM_CO2GDP"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.5",
        "code": "9.5.1",
        "description": "Research and development expenditure as a proportion of GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.5.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.5"
                ],
                "indicator": [
                    "9.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_XPD_RSDV",
                "description": "Research and development expenditure as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/GB_XPD_RSDV"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.5",
        "code": "9.5.2",
        "description": "Researchers (in full-time equivalent) per million inhabitants",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.5.2",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.5"
                ],
                "indicator": [
                    "9.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_POP_SCIERD",
                "description": "Researchers (in full-time equivalent) per million inhabitants (per 1,000,000 population)",
                "uri": "/v1/sdg/Series/GB_POP_SCIERD"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.a",
        "code": "9.a.1",
        "description": "Total official international support (official development assistance plus other official flows) to infrastructure",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.a.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.a"
                ],
                "indicator": [
                    "9.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TOF_INFRAL",
                "description": "Total official flows for infrastructure, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_TOF_INFRAL"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.b",
        "code": "9.b.1",
        "description": "Proportion of medium and high-tech industry value added in total value added",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.b.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.b"
                ],
                "indicator": [
                    "9.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NV_IND_TECH",
                "description": "Proportion of medium and high-tech manufacturing value added in total value added (%)",
                "uri": "/v1/sdg/Series/NV_IND_TECH"
            }
        ]
    },
    {
        "goal": "9",
        "target": "9.c",
        "code": "9.c.1",
        "description": "Proportion of population covered by a mobile network, by technology",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/9.c.1",
        "series": [
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.c"
                ],
                "indicator": [
                    "9.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_MOB_2GNTWK",
                "description": "Proportion of population covered by at least a 2G mobile network (%)",
                "uri": "/v1/sdg/Series/IT_MOB_2GNTWK"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.c"
                ],
                "indicator": [
                    "9.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_MOB_3GNTWK",
                "description": "Proportion of population covered by at least a 3G mobile network (%)",
                "uri": "/v1/sdg/Series/IT_MOB_3GNTWK"
            },
            {
                "goal": [
                    "9"
                ],
                "target": [
                    "9.c"
                ],
                "indicator": [
                    "9.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_MOB_4GNTWK",
                "description": "Proportion of population covered by at least a 4G mobile network (%)",
                "uri": "/v1/sdg/Series/IT_MOB_4GNTWK"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.1",
        "code": "10.1.1",
        "description": "Growth rates of household expenditure or income per capita among the bottom 40 per cent of the population and the total population",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/10.1.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.1"
                ],
                "indicator": [
                    "10.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_HEI_TOTL",
                "description": "Growth rates of household expenditure or income per capita (%)",
                "uri": "/v1/sdg/Series/SI_HEI_TOTL"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.2",
        "code": "10.2.1",
        "description": "Proportion of people living below 50 per cent of median income, by sex, age and persons with disabilities",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/10.2.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.2"
                ],
                "indicator": [
                    "10.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_POV_50MI",
                "description": "Proportion of people living below 50 percent of median income (%)",
                "uri": "/v1/sdg/Series/SI_POV_50MI"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.3",
        "code": "10.3.1",
        "description": "Proportion of population reporting having personally felt discriminated against or harassed in the previous 12 months on the basis of a ground of discrimination prohibited under international human rights law",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/10.3.1",
        "series": [
            {
                "goal": [
                    "10",
                    "16"
                ],
                "target": [
                    "10.3",
                    "16.b"
                ],
                "indicator": [
                    "10.3.1",
                    "16.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VOV_GDSD",
                "description": "Proportion of population reporting having felt discriminated against, by grounds of discrimination, sex and disability (%)",
                "uri": "/v1/sdg/Series/VC_VOV_GDSD"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.4",
        "code": "10.4.1",
        "description": "Labour share of GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.4.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.4"
                ],
                "indicator": [
                    "10.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_EMP_GTOTL",
                "description": "Labour share of GDP (%)",
                "uri": "/v1/sdg/Series/SL_EMP_GTOTL"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.4",
        "code": "10.4.2",
        "description": "Redistributive impact of fiscal policy",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/10.4.2",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.4"
                ],
                "indicator": [
                    "10.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_DST_FISP",
                "description": "Redistributive impact of fiscal policy, Gini index (%)",
                "uri": "/v1/sdg/Series/SI_DST_FISP"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.5",
        "code": "10.5.1",
        "description": "Financial Soundness Indicators",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.5.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSANL",
                "description": "Non-performing loans to total gross loans (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSANL"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSERA",
                "description": "Return on assets (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSERA"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSKA",
                "description": "Regulatory capital to assets (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSKA"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSKNL",
                "description": "Non-performing loans net of provisions to capital (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSKNL"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSKRTC",
                "description": "Regulatory Tier 1 capital to risk-weighted assets (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSKRTC"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSLS",
                "description": "Liquid assets to short term liabilities (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSLS"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.5"
                ],
                "indicator": [
                    "10.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_FSI_FSSNO",
                "description": "Net open position in foreign exchange to capital (%)",
                "uri": "/v1/sdg/Series/FI_FSI_FSSNO"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.6",
        "code": "10.6.1",
        "description": "Proportion of members and voting rights of developing countries in international organizations",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.6.1",
        "series": [
            {
                "goal": [
                    "10",
                    "16"
                ],
                "target": [
                    "10.6",
                    "16.8"
                ],
                "indicator": [
                    "10.6.1",
                    "16.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_INT_MBRDEV",
                "description": "Proportion of members of developing countries in international organizations, by organization (%)",
                "uri": "/v1/sdg/Series/SG_INT_MBRDEV"
            },
            {
                "goal": [
                    "10",
                    "16"
                ],
                "target": [
                    "10.6",
                    "16.8"
                ],
                "indicator": [
                    "10.6.1",
                    "16.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_INT_VRTDEV",
                "description": "Proportion of voting rights of developing countries in international organizations, by organization (%)",
                "uri": "/v1/sdg/Series/SG_INT_VRTDEV"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.7",
        "code": "10.7.2",
        "description": "Number of countries with migration policies that facilitate orderly, safe, regular and responsible migration and mobility of people",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/10.7.2",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.7"
                ],
                "indicator": [
                    "10.7.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_CPA_MIGRP",
                "description": "Proportion of countries with migration policies to facilitate orderly, safe, regular and responsible migration and mobility of people, by policy domain (%)",
                "uri": "/v1/sdg/Series/SG_CPA_MIGRP"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.7"
                ],
                "indicator": [
                    "10.7.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_CPA_MIGRS",
                "description": "Countries with migration policies to facilitate orderly, safe, regular and responsible migration and mobility of people, by policy domain (1 = Requires further progress; 2 = Partially meets; 3 = Meets; 4 = Fully meets)",
                "uri": "/v1/sdg/Series/SG_CPA_MIGRS"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.7",
        "code": "10.7.3",
        "description": "Number of people who died or disappeared in the process of migration towards an international destination",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.7.3",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.7"
                ],
                "indicator": [
                    "10.7.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SM_DTH_MIGR",
                "description": "Total deaths and disappearances recorded during migration (number)",
                "uri": "/v1/sdg/Series/SM_DTH_MIGR"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.7",
        "code": "10.7.4",
        "description": "Proportion of the population who are refugees, by country of origin",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.7.4",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.7"
                ],
                "indicator": [
                    "10.7.4"
                ],
                "release": "2022.Q3.G.03",
                "code": "SM_POP_REFG_OR",
                "description": "Number of refugees per 100,000 population, by country of origin (per 100,000 population)",
                "uri": "/v1/sdg/Series/SM_POP_REFG_OR"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.7",
        "code": "10.7.1",
        "description": "Recruitment cost borne by employee as a proportion of monthly income earned in country of destination",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/10.7.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.7"
                ],
                "indicator": [
                    "10.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SL_EMP_RCOST_MO",
                "description": "Migrant recruitment costs (number of months of earnings)",
                "uri": "/v1/sdg/Series/SL_EMP_RCOST_MO"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.a",
        "code": "10.a.1",
        "description": "Proportion of tariff lines applied to imports from least developed countries and developing countries with zero-tariff",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.a.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.a"
                ],
                "indicator": [
                    "10.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TM_TRF_ZERO",
                "description": "Proportion of tariff lines applied to imports with zero-tariff (%)",
                "uri": "/v1/sdg/Series/TM_TRF_ZERO"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.b",
        "code": "10.b.1",
        "description": "Total resource flows for development, by recipient and donor countries and type of flow (e.g. official development assistance, foreign direct investment and other flows)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.b.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.b"
                ],
                "indicator": [
                    "10.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TRF_TOTDL",
                "description": "Total assistance for development, by donor countries (millions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_TRF_TOTDL"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.b"
                ],
                "indicator": [
                    "10.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TRF_TOTL",
                "description": "Total assistance for development, by recipient countries (millions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_TRF_TOTL"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.b"
                ],
                "indicator": [
                    "10.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_TRF_TFDV",
                "description": "Total resource flows for development, by recipient and donor countries (millions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_TRF_TFDV"
            }
        ]
    },
    {
        "goal": "10",
        "target": "10.c",
        "code": "10.c.1",
        "description": "Remittance costs as a proportion of the amount remitted",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/10.c.1",
        "series": [
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.c"
                ],
                "indicator": [
                    "10.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_RMT_COST",
                "description": "Average remittance costs of sending $200 to a receiving country as a proportion of the amount remitted (%)",
                "uri": "/v1/sdg/Series/SI_RMT_COST"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.c"
                ],
                "indicator": [
                    "10.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_RMT_COST_BC",
                "description": "Average remittance costs of sending $200 in a corridor as a proportion of the amount remitted (%)",
                "uri": "/v1/sdg/Series/SI_RMT_COST_BC"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.c"
                ],
                "indicator": [
                    "10.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_RMT_COST_SC",
                "description": "SmaRT average remittance costs of sending $200 in a corridor as a proportion of the amount remitted (%)",
                "uri": "/v1/sdg/Series/SI_RMT_COST_SC"
            },
            {
                "goal": [
                    "10"
                ],
                "target": [
                    "10.c"
                ],
                "indicator": [
                    "10.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SI_RMT_COST_SND",
                "description": "Average remittance costs of sending $200 for a sending country as a proportion of the amount remitted (%)",
                "uri": "/v1/sdg/Series/SI_RMT_COST_SND"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.1",
        "code": "11.1.1",
        "description": "Proportion of urban population living in slums, informal settlements or inadequate housing",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/11.1.1",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.1"
                ],
                "indicator": [
                    "11.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_LND_SLUM",
                "description": "Proportion of urban population living in slums (%)",
                "uri": "/v1/sdg/Series/EN_LND_SLUM"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.2",
        "code": "11.2.1",
        "description": "Proportion of population that has convenient access to public transport, by sex, age and persons with disabilities",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.2.1",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.2"
                ],
                "indicator": [
                    "11.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SP_TRN_PUBL",
                "description": "Proportion of population that has convenient access to public transport (%)",
                "uri": "/v1/sdg/Series/SP_TRN_PUBL"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.3",
        "code": "11.3.1",
        "description": "Ratio of land consumption rate to population growth rate",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.3.1",
        "series": []
    },
    {
        "goal": "11",
        "target": "11.3",
        "code": "11.3.2",
        "description": "Proportion of cities with a direct participation structure of civil society in urban planning and management that operate regularly and democratically",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.3.2",
        "series": []
    },
    {
        "goal": "11",
        "target": "11.4",
        "code": "11.4.1",
        "description": "Total per capita expenditure on the preservation, protection and conservation of all cultural and natural heritage, by source of funding (public, private), type of heritage (cultural, natural) and level of government (national, regional, and local/municipal)",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.4.1",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.4"
                ],
                "indicator": [
                    "11.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_XPD_CULNAT_PB",
                "description": "Total expenditure per capita spent on cultural and natural heritage, public (PPP, constant 2017 United States dollars)",
                "uri": "/v1/sdg/Series/GB_XPD_CULNAT_PB"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.4"
                ],
                "indicator": [
                    "11.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_XPD_CULNAT_PV",
                "description": "Total expenditure per capita spent on cultural and natural heritage, private (PPP, constant 2017 United States dollars)",
                "uri": "/v1/sdg/Series/GB_XPD_CULNAT_PV"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.4"
                ],
                "indicator": [
                    "11.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_XPD_CULNAT_PBPV",
                "description": "Total expenditure per capita spent on cultural and natural heritage, public and private (PPP, constant 2017 United States dollars)",
                "uri": "/v1/sdg/Series/GB_XPD_CULNAT_PBPV"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.4"
                ],
                "indicator": [
                    "11.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_XPD_CUL_PBPV",
                "description": "Total expenditure per capita spent on cultural heritage, public and private (PPP, constant 2017 United States dollars)",
                "uri": "/v1/sdg/Series/GB_XPD_CUL_PBPV"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.4"
                ],
                "indicator": [
                    "11.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GB_XPD_NAT_PBPV",
                "description": "Total expenditure per capita spent on natural heritage, public and private (PPP, constant 2017 United States dollars)",
                "uri": "/v1/sdg/Series/GB_XPD_NAT_PBPV"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.5",
        "code": "11.5.1",
        "description": "Number of deaths, missing persons and directly affected persons attributed to disasters per 100,000 population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/11.5.1",
        "series": [
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MISS",
                "description": "Number of missing persons due to disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MISS"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_AFFCT",
                "description": "Number of people affected by disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_AFFCT"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MORT",
                "description": "Number of deaths due to disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MORT"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MTMP",
                "description": "Number of deaths and missing persons attributed to disasters per 100,000 population (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MTMP"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MMHN",
                "description": "Number of deaths and missing persons attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MMHN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_DAFF",
                "description": "Number of directly affected persons attributed to disasters per 100,000 population (number)",
                "uri": "/v1/sdg/Series/VC_DSR_DAFF"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_IJILN",
                "description": "Number of injured or ill people attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_IJILN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDAN",
                "description": "Number of people whose damaged dwellings were attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDAN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDYN",
                "description": "Number of people whose destroyed dwellings were attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDYN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDLN",
                "description": "Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDLN"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.5",
        "code": "11.5.2",
        "description": "Direct economic loss attributed to disasters in relation to global gross domestic product (GDP)",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.5.2",
        "series": [
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_GDPLS",
                "description": "Direct economic loss attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_GDPLS"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_LSGP",
                "description": "Direct economic loss attributed to disasters relative to GDP (%)",
                "uri": "/v1/sdg/Series/VC_DSR_LSGP"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_AGLH",
                "description": "Direct agriculture loss attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_AGLH"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_HOLH",
                "description": "Direct economic loss in the housing sector attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_HOLH"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_CILN",
                "description": "Direct economic loss resulting from damaged or destroyed critical infrastructure attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_CILN"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_CHLN",
                "description": "Direct economic loss to cultural heritage damaged or destroyed attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_CHLN"
            },
            {
                "goal": [
                    "1",
                    "11"
                ],
                "target": [
                    "1.5",
                    "11.5"
                ],
                "indicator": [
                    "1.5.2",
                    "11.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_DDPA",
                "description": "Direct economic loss to other damaged or destroyed productive assets attributed to disasters (current United States dollars)",
                "uri": "/v1/sdg/Series/VC_DSR_DDPA"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.5",
        "code": "11.5.3",
        "description": "(a) Damage to critical infrastructure and (b) number of disruptions to basic services, attributed to disasters",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.5.3",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_CDAN",
                "description": "Number of damaged critical infrastructure attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_CDAN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_HFDN",
                "description": "Number of destroyed or damaged health facilities attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_HFDN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_EFDN",
                "description": "Number of destroyed or damaged educational facilities attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_EFDN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_CDYN",
                "description": "Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_CDYN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_BSDN",
                "description": "Number of disruptions to basic services attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_BSDN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_ESDN",
                "description": "Number of disruptions to educational services attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_ESDN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_HSDN",
                "description": "Number of disruptions to health services attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_HSDN"
            },
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.5"
                ],
                "indicator": [
                    "11.5.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_OBDN",
                "description": "Number of disruptions to other basic services attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_OBDN"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.6",
        "code": "11.6.1",
        "description": "Proportion of municipal solid waste collected and managed in controlled facilities out of total municipal waste generated, by cities",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.6.1",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.6"
                ],
                "indicator": [
                    "11.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_REF_WASCOL",
                "description": "Municipal Solid Waste collection coverage, by cities (%)",
                "uri": "/v1/sdg/Series/EN_REF_WASCOL"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.6",
        "code": "11.6.2",
        "description": "Annual mean levels of fine particulate matter (e.g. PM2.5 and PM10) in cities (population weighted)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/11.6.2",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.6"
                ],
                "indicator": [
                    "11.6.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ATM_PM25",
                "description": "Annual mean levels of fine particulate matter (population-weighted), by location (micrograms per cubic meter)",
                "uri": "/v1/sdg/Series/EN_ATM_PM25"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.7",
        "code": "11.7.1",
        "description": "Average share of the built-up area of cities that is open space for public use for all, by sex, age and persons with disabilities",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.7.1",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.7"
                ],
                "indicator": [
                    "11.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_URB_OPENSP",
                "description": "Average share of the built-up area of cities that is open space for public use for all (%)",
                "uri": "/v1/sdg/Series/EN_URB_OPENSP"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.7",
        "code": "11.7.2",
        "description": "Proportion of persons victim of physical or sexual harassment, by sex, age, disability status and place of occurrence, in the previous 12 months",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.7.2",
        "series": []
    },
    {
        "goal": "11",
        "target": "11.a",
        "code": "11.a.1",
        "description": "Number of countries that have national urban policies or regional development plans that (a) respond to population dynamics; (b) ensure balanced territorial development; and (c) increase local fiscal space",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/11.a.1",
        "series": [
            {
                "goal": [
                    "11"
                ],
                "target": [
                    "11.a"
                ],
                "indicator": [
                    "11.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SD_CPA_UPRDP",
                "description": "Countries that have national urban policies or regional development plans that respond to population dynamics; ensure balanced territorial development; and increase local fiscal space (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SD_CPA_UPRDP"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.b",
        "code": "11.b.1",
        "description": "Number of countries that adopt and implement national disaster risk reduction strategies in line with the Sendai Framework for Disaster Risk Reduction 2015-2030",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/11.b.1",
        "series": [
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.b",
                    "13.1"
                ],
                "indicator": [
                    "1.5.3",
                    "11.b.1",
                    "13.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_LGRGSR",
                "description": "Score of adoption and implementation of national DRR strategies in line with the Sendai Framework",
                "uri": "/v1/sdg/Series/SG_DSR_LGRGSR"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.b",
                    "13.1"
                ],
                "indicator": [
                    "1.5.3",
                    "11.b.1",
                    "13.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SFDRR",
                "description": "Number of countries that reported having a National DRR Strategy which is aligned to the Sendai Framework",
                "uri": "/v1/sdg/Series/SG_DSR_SFDRR"
            }
        ]
    },
    {
        "goal": "11",
        "target": "11.b",
        "code": "11.b.2",
        "description": "Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/11.b.2",
        "series": [
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SILS",
                "description": "Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)",
                "uri": "/v1/sdg/Series/SG_DSR_SILS"
            },
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SILN",
                "description": "Number of local governments that adopt and implement local DRR strategies in line with national strategies (number)",
                "uri": "/v1/sdg/Series/SG_DSR_SILN"
            },
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GOV_LOGV",
                "description": "Number of local governments (number)",
                "uri": "/v1/sdg/Series/SG_GOV_LOGV"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.1",
        "code": "12.1.1",
        "description": "Number of countries developing, adopting or implementing policy instruments aimed at supporting the shift to sustainable consumption and production",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.1.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.1"
                ],
                "indicator": [
                    "12.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_SCP_CNTRY",
                "description": "Countries with sustainable consumption and production (SCP) national action plans or SCP mainstreamed as a priority or target into national policies (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_SCP_CNTRY"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.1"
                ],
                "indicator": [
                    "12.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_SCP_POLINS",
                "description": "Countries with policy instrument for sustainable consumption and production (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_SCP_POLINS"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.1"
                ],
                "indicator": [
                    "12.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_SCP_TOTLN",
                "description": "Number of policies, instruments and mechanism in place for sustainable consumption and production (Number)",
                "uri": "/v1/sdg/Series/SG_SCP_TOTLN"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.2",
        "code": "12.2.1",
        "description": "Material footprint, material footprint per capita, and material footprint per GDP",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.2.1",
        "series": [
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.1",
                    "8.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_FTPRPG",
                "description": "Material footprint per unit of GDP, by type of raw material (kilograms per constant 2015 United States dollar)",
                "uri": "/v1/sdg/Series/EN_MAT_FTPRPG"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.1",
                    "8.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_FTPRPC",
                "description": "Material footprint per capita, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_FTPRPC"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.1",
                    "8.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_FTPRTN",
                "description": "Material footprint, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_FTPRTN"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.2",
        "code": "12.2.2",
        "description": "Domestic material consumption, domestic material consumption per capita, and domestic material consumption per GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/12.2.2",
        "series": [
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.2",
                    "8.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_DOMCMPT",
                "description": "Domestic material consumption, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_DOMCMPT"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.2",
                    "8.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_DOMCMPG",
                "description": "Domestic material consumption per unit of GDP, by type of raw material (kilograms per constant 2015 United States dollars)",
                "uri": "/v1/sdg/Series/EN_MAT_DOMCMPG"
            },
            {
                "goal": [
                    "12",
                    "8"
                ],
                "target": [
                    "12.2",
                    "8.4"
                ],
                "indicator": [
                    "12.2.2",
                    "8.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAT_DOMCMPC",
                "description": "Domestic material consumption per capita, by type of raw material (tonnes)",
                "uri": "/v1/sdg/Series/EN_MAT_DOMCMPC"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.3",
        "code": "12.3.1",
        "description": "(a) Food loss index and (b) food waste index",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.3.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.3"
                ],
                "indicator": [
                    "12.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FOOD_WST_PC",
                "description": "Food waste per capita (KG)",
                "uri": "/v1/sdg/Series/AG_FOOD_WST_PC"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.3"
                ],
                "indicator": [
                    "12.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FOOD_WST",
                "description": "Food waste (Tonnes)",
                "uri": "/v1/sdg/Series/AG_FOOD_WST"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.3"
                ],
                "indicator": [
                    "12.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FLS_INDEX",
                "description": "Global food loss index",
                "uri": "/v1/sdg/Series/AG_FLS_INDEX"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.3"
                ],
                "indicator": [
                    "12.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_FLS_PCT",
                "description": "Food loss percentage (%)",
                "uri": "/v1/sdg/Series/AG_FLS_PCT"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.4",
        "code": "12.4.1",
        "description": "Number of parties to international multilateral environmental agreements on hazardous waste, and other chemicals that meet their commitments and obligations in transmitting information as required by each relevant agreement",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/12.4.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_HAZ_CMRMNTRL",
                "description": "Parties meeting their commitments and obligations in transmitting information as required by Montreal Protocol on hazardous waste, and other chemicals",
                "uri": "/v1/sdg/Series/SG_HAZ_CMRMNTRL"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_HAZ_CMRROTDAM",
                "description": "Parties meeting their commitments and obligations in transmitting information as required by Rotterdam Convention on hazardous waste, and other chemicals",
                "uri": "/v1/sdg/Series/SG_HAZ_CMRROTDAM"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_HAZ_CMRBASEL",
                "description": "Parties meeting their commitments and obligations in transmitting information as required by Basel Convention on hazardous waste, and other chemicals",
                "uri": "/v1/sdg/Series/SG_HAZ_CMRBASEL"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_HAZ_CMRSTHOLM",
                "description": "Parties meeting their commitments and obligations in transmitting information as required by Stockholm Convention on hazardous waste, and other chemicals",
                "uri": "/v1/sdg/Series/SG_HAZ_CMRSTHOLM"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_HAZ_CMRMNMT",
                "description": "Parties meeting their commitments and obligations in transmitting information as required by Minamata Convention on hazardous waste, and other chemicals (%)",
                "uri": "/v1/sdg/Series/SG_HAZ_CMRMNMT"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.4",
        "code": "12.4.2",
        "description": "(a) Hazardous waste generated per capita; and (b) proportion of hazardous waste treated, by type of treatment",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.4.2",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_GENV",
                "description": "Electronic waste generated (Tonnes)",
                "uri": "/v1/sdg/Series/EN_EWT_GENV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_GENPCAP",
                "description": "Electronic waste generated, per capita (Kg)",
                "uri": "/v1/sdg/Series/EN_EWT_GENPCAP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_GENV",
                "description": "Hazardous waste generated (Tonnes)",
                "uri": "/v1/sdg/Series/EN_HAZ_GENV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_PCAP",
                "description": "Hazardous waste generated, per capita (Kg)",
                "uri": "/v1/sdg/Series/EN_HAZ_PCAP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_GENGDP",
                "description": "Hazardous waste generated, per unit of GDP (kilograms per constant 2015 United States dollars)",
                "uri": "/v1/sdg/Series/EN_HAZ_GENGDP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_TREATV",
                "description": "Hazardous waste treated, by type of treatment (Tonnes)",
                "uri": "/v1/sdg/Series/EN_HAZ_TREATV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_TRTDISR",
                "description": "Hazardous waste treated or disposed, rate (%)",
                "uri": "/v1/sdg/Series/EN_HAZ_TRTDISR"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_TRTDISV",
                "description": "Hazardous waste treated or disposed (Tonnes)",
                "uri": "/v1/sdg/Series/EN_HAZ_TRTDISV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MWT_COLLV",
                "description": "Municipal waste collected (Tonnes)",
                "uri": "/v1/sdg/Series/EN_MWT_COLLV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MWT_TREATR",
                "description": "Municipal waste treated, by type of treatment (%)",
                "uri": "/v1/sdg/Series/EN_MWT_TREATR"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MWT_GENV",
                "description": "Municipal waste generated (Tonnes)",
                "uri": "/v1/sdg/Series/EN_MWT_GENV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_COLLV",
                "description": "Electronic waste collected (Tonnes)",
                "uri": "/v1/sdg/Series/EN_EWT_COLLV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_COLLPCAP",
                "description": "Electronic waste collected, per capita (KG)",
                "uri": "/v1/sdg/Series/EN_EWT_COLLPCAP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_COLLR",
                "description": "Electronic waste collection rate (%)",
                "uri": "/v1/sdg/Series/EN_EWT_COLLR"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_TWT_GENV",
                "description": "Total waste generation, by activity (Tonnes)",
                "uri": "/v1/sdg/Series/EN_TWT_GENV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_EXP",
                "description": "Hazardous waste exported, (Tonnes)",
                "uri": "/v1/sdg/Series/EN_HAZ_EXP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.4"
                ],
                "indicator": [
                    "12.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_HAZ_IMP",
                "description": "Hazardous waste imported, (Tonnes)",
                "uri": "/v1/sdg/Series/EN_HAZ_IMP"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.5",
        "code": "12.5.1",
        "description": "National recycling rate, tons of material recycled",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.5.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.5"
                ],
                "indicator": [
                    "12.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_RCYV",
                "description": "Electronic waste recycling (Tonnes)",
                "uri": "/v1/sdg/Series/EN_EWT_RCYV"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.5"
                ],
                "indicator": [
                    "12.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_RCYR",
                "description": "Electronic waste recycling, rate (%)",
                "uri": "/v1/sdg/Series/EN_EWT_RCYR"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.5"
                ],
                "indicator": [
                    "12.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_EWT_RCYPCAP",
                "description": "Electronic waste recycling, per capita (Kg)",
                "uri": "/v1/sdg/Series/EN_EWT_RCYPCAP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.5"
                ],
                "indicator": [
                    "12.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MWT_RCYV",
                "description": "Municipal waste recycled (Tonnes)",
                "uri": "/v1/sdg/Series/EN_MWT_RCYV"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.6",
        "code": "12.6.1",
        "description": "Number of companies publishing sustainability reports",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.6.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.6"
                ],
                "indicator": [
                    "12.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_SCP_FRMN",
                "description": "Number of companies publishing sustainability reports with disclosure by dimension, by level of requirement (Number)",
                "uri": "/v1/sdg/Series/EN_SCP_FRMN"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.7",
        "code": "12.7.1",
        "description": "Degree of sustainable public procurement policies and action plan implementation",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.7.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.7"
                ],
                "indicator": [
                    "12.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_SCP_PROCN",
                "description": "Number of countries implementing sustainable public procurement policies and action plans",
                "uri": "/v1/sdg/Series/SG_SCP_PROCN"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.7"
                ],
                "indicator": [
                    "12.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_SCP_PROCN_HS",
                "description": "Number of countries implementing sustainable public procurement policies and action plans at higher subnational level by level of implementation (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_SCP_PROCN_HS"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.7"
                ],
                "indicator": [
                    "12.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_SCP_PROCN_LS",
                "description": "Number of countries implementing sustainable public procurement policies and action plans at lower subnational level by level of implementation (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_SCP_PROCN_LS"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.8",
        "code": "12.8.1",
        "description": "Extent to which (i) global citizenship education and (ii) education for sustainable development are mainstreamed in (a) national education policies; (b) curricula; (c) teacher education; and (d) student assessment",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/12.8.1",
        "series": [
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_NEP",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in national education policies",
                "uri": "/v1/sdg/Series/SE_GCEDESD_NEP"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_CUR",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in curricula",
                "uri": "/v1/sdg/Series/SE_GCEDESD_CUR"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_TED",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in teacher education",
                "uri": "/v1/sdg/Series/SE_GCEDESD_TED"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_SAS",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in student assessment",
                "uri": "/v1/sdg/Series/SE_GCEDESD_SAS"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.a",
        "code": "12.a.1",
        "description": "Installed renewable energy-generating capacity in developing countries (in watts per capita)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/12.a.1",
        "series": [
            {
                "goal": [
                    "7",
                    "12"
                ],
                "target": [
                    "7.b",
                    "12.a"
                ],
                "indicator": [
                    "7.b.1",
                    "12.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EG_EGY_RNEW",
                "description": "Installed renewable electricity-generating capacity (watts per capita)",
                "uri": "/v1/sdg/Series/EG_EGY_RNEW"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.b",
        "code": "12.b.1",
        "description": "Implementation of standard accounting tools to monitor the economic and environmental aspects of tourism sustainability",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/12.b.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.b"
                ],
                "indicator": [
                    "12.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ST_EEV_STDACCT",
                "description": "Implementation of standard accounting tools to monitor the economic and environmental aspects of tourism (number of tables)",
                "uri": "/v1/sdg/Series/ST_EEV_STDACCT"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.b"
                ],
                "indicator": [
                    "12.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ST_EEV_ACCSEEA",
                "description": "Implementation of standard accounting tools to monitor the economic and environmental aspects of tourism (SEEA tables)",
                "uri": "/v1/sdg/Series/ST_EEV_ACCSEEA"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.b"
                ],
                "indicator": [
                    "12.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ST_EEV_ACCTSA",
                "description": "Implementation of standard accounting tools to monitor the economic and environmental aspects of tourism (Tourism Satellite Account tables)",
                "uri": "/v1/sdg/Series/ST_EEV_ACCTSA"
            }
        ]
    },
    {
        "goal": "12",
        "target": "12.c",
        "code": "12.c.1",
        "description": "Amount of fossil-fuel subsidies (production and consumption) per unit of GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/12.c.1",
        "series": [
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.c"
                ],
                "indicator": [
                    "12.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_FFS_CMPT_GDP",
                "description": "Fossil-fuel subsidies (consumption and production) as a proportion of total GDP (%)",
                "uri": "/v1/sdg/Series/ER_FFS_CMPT_GDP"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.c"
                ],
                "indicator": [
                    "12.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_FFS_CMPT_CD",
                "description": "Fossil-fuel subsidies (consumption and production) (billions of nominal United States dollars)",
                "uri": "/v1/sdg/Series/ER_FFS_CMPT_CD"
            },
            {
                "goal": [
                    "12"
                ],
                "target": [
                    "12.c"
                ],
                "indicator": [
                    "12.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_FFS_CMPT_PC_CD",
                "description": "Fossil-fuel subsidies (consumption and production) per capita (nominal United States dollars)",
                "uri": "/v1/sdg/Series/ER_FFS_CMPT_PC_CD"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.1",
        "code": "13.1.1",
        "description": "Number of deaths, missing persons and directly affected persons attributed to disasters per 100,000 population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/13.1.1",
        "series": [
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MISS",
                "description": "Number of missing persons due to disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MISS"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_AFFCT",
                "description": "Number of people affected by disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_AFFCT"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MORT",
                "description": "Number of deaths due to disaster (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MORT"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MTMP",
                "description": "Number of deaths and missing persons attributed to disasters per 100,000 population (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MTMP"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_MMHN",
                "description": "Number of deaths and missing persons attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_MMHN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_DAFF",
                "description": "Number of directly affected persons attributed to disasters per 100,000 population (number)",
                "uri": "/v1/sdg/Series/VC_DSR_DAFF"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_IJILN",
                "description": "Number of injured or ill people attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_IJILN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDAN",
                "description": "Number of people whose damaged dwellings were attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDAN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDYN",
                "description": "Number of people whose destroyed dwellings were attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDYN"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.5",
                    "13.1"
                ],
                "indicator": [
                    "1.5.1",
                    "11.5.1",
                    "13.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DSR_PDLN",
                "description": "Number of people whose livelihoods were disrupted or destroyed, attributed to disasters (number)",
                "uri": "/v1/sdg/Series/VC_DSR_PDLN"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.1",
        "code": "13.1.2",
        "description": "Number of countries that adopt and implement national disaster risk reduction strategies in line with the Sendai Framework for Disaster Risk Reduction 2015-2030",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/13.1.2",
        "series": [
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.b",
                    "13.1"
                ],
                "indicator": [
                    "1.5.3",
                    "11.b.1",
                    "13.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_LGRGSR",
                "description": "Score of adoption and implementation of national DRR strategies in line with the Sendai Framework",
                "uri": "/v1/sdg/Series/SG_DSR_LGRGSR"
            },
            {
                "goal": [
                    "1",
                    "11",
                    "13"
                ],
                "target": [
                    "1.5",
                    "11.b",
                    "13.1"
                ],
                "indicator": [
                    "1.5.3",
                    "11.b.1",
                    "13.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SFDRR",
                "description": "Number of countries that reported having a National DRR Strategy which is aligned to the Sendai Framework",
                "uri": "/v1/sdg/Series/SG_DSR_SFDRR"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.1",
        "code": "13.1.3",
        "description": "Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/13.1.3",
        "series": [
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SILS",
                "description": "Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)",
                "uri": "/v1/sdg/Series/SG_DSR_SILS"
            },
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DSR_SILN",
                "description": "Number of local governments that adopt and implement local DRR strategies in line with national strategies (number)",
                "uri": "/v1/sdg/Series/SG_DSR_SILN"
            },
            {
                "goal": [
                    "1",
                    "13",
                    "11"
                ],
                "target": [
                    "1.5",
                    "13.1",
                    "11.b"
                ],
                "indicator": [
                    "1.5.4",
                    "13.1.3",
                    "11.b.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_GOV_LOGV",
                "description": "Number of local governments (number)",
                "uri": "/v1/sdg/Series/SG_GOV_LOGV"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.2",
        "code": "13.2.2",
        "description": "Total greenhouse gas emissions per year",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/13.2.2",
        "series": [
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ATM_GHGT_AIP",
                "description": "Total greenhouse gas emissions without LULUCF for Annex I Parties (Mt CO??? equivalent)",
                "uri": "/v1/sdg/Series/EN_ATM_GHGT_AIP"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ATM_GHGT_NAIP",
                "description": "Total greenhouse gas emissions without LULUCF for non-Annex I Parties (Mt CO??? equivalent)",
                "uri": "/v1/sdg/Series/EN_ATM_GHGT_NAIP"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.2",
        "code": "13.2.1",
        "description": "Number of countries with nationally determined contributions, long-term strategies, national adaptation plans and adaptation communications, as reported to the secretariat of the United Nations Framework Convention on Climate Change",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/13.2.1",
        "series": [
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NACOM_NAIP",
                "description": "Number of countries with national communications, non-Annex I Parties (Number)",
                "uri": "/v1/sdg/Series/EN_NACOM_NAIP"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_BIUREP_NAIP",
                "description": "Number of countries with biennial update reports, non-Annex I Parties (Number)",
                "uri": "/v1/sdg/Series/EN_BIUREP_NAIP"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NACOM_AIP",
                "description": "Number of countries with national communications, Annex I Parties (Number)",
                "uri": "/v1/sdg/Series/EN_NACOM_AIP"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_BIUREP_AIP",
                "description": "Number of countries with biennial reports, Annex I Parties (Number)",
                "uri": "/v1/sdg/Series/EN_BIUREP_AIP"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ADAP_COM",
                "description": "Number of countries with adaptation communications (Number)",
                "uri": "/v1/sdg/Series/EN_ADAP_COM"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NAD_CONTR",
                "description": "Number of countries with nationally determined contributions (Number)",
                "uri": "/v1/sdg/Series/EN_NAD_CONTR"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.2"
                ],
                "indicator": [
                    "13.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NAA_PLAN",
                "description": "Number of countries with national adaptation plans (Number)",
                "uri": "/v1/sdg/Series/EN_NAA_PLAN"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.3",
        "code": "13.3.1",
        "description": "Extent to which (i) global citizenship education and (ii) education for sustainable development are mainstreamed in (a) national education policies; (b) curricula; (c) teacher education; and (d) student assessment",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/13.3.1",
        "series": [
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_NEP",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in national education policies",
                "uri": "/v1/sdg/Series/SE_GCEDESD_NEP"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_CUR",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in curricula",
                "uri": "/v1/sdg/Series/SE_GCEDESD_CUR"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_TED",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in teacher education",
                "uri": "/v1/sdg/Series/SE_GCEDESD_TED"
            },
            {
                "goal": [
                    "4",
                    "12",
                    "13"
                ],
                "target": [
                    "4.7",
                    "12.8",
                    "13.3"
                ],
                "indicator": [
                    "4.7.1",
                    "12.8.1",
                    "13.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SE_GCEDESD_SAS",
                "description": "Extent to which global citizenship education and education for sustainable development are mainstreamed in student assessment",
                "uri": "/v1/sdg/Series/SE_GCEDESD_SAS"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.a",
        "code": "13.a.1",
        "description": "Amounts provided and mobilized in United States dollars per year in relation to the continued existing collective mobilization goal of the $100 billion commitment through to 2025",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/13.a.1",
        "series": [
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.a"
                ],
                "indicator": [
                    "13.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_FIN_CLIMB",
                "description": "Climate-specific financial support provided via bilateral, regional and other channels, by type of support (Billions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_FIN_CLIMB"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.a"
                ],
                "indicator": [
                    "13.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_FIN_CLIMM",
                "description": "Climate-specific financial support provided via multilateral channels, by type of support (Billions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_FIN_CLIMM"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.a"
                ],
                "indicator": [
                    "13.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_FIN_CLIMT",
                "description": "Total climate-specific financial support provided (Billions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_FIN_CLIMT"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.a"
                ],
                "indicator": [
                    "13.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_FIN_GEN",
                "description": "Core/general contributions provided to multilateral institutions (Billions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_FIN_GEN"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.a"
                ],
                "indicator": [
                    "13.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_FIN_TOT",
                "description": "Total financial support provided (Billions of current United States dollars)",
                "uri": "/v1/sdg/Series/DC_FIN_TOT"
            }
        ]
    },
    {
        "goal": "13",
        "target": "13.b",
        "code": "13.b.1",
        "description": "Number of least developed countries and small island developing States with nationally determined contributions, long-term strategies, national adaptation plans and adaptation communications, as reported to the secretariat of the United Nations Framework Convention on Climate Change",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/13.b.1",
        "series": [
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.b"
                ],
                "indicator": [
                    "13.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NACOM_NAIP_DV",
                "description": "Number of least developed countries and small island developing States with national communications, non-Annex I Parties (Number)",
                "uri": "/v1/sdg/Series/EN_NACOM_NAIP_DV"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.b"
                ],
                "indicator": [
                    "13.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_BIUREP_NAIP_DV",
                "description": "Number of least developed countries and small island developing States with biennial update reports, non-Annex I Parties (Number)",
                "uri": "/v1/sdg/Series/EN_BIUREP_NAIP_DV"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.b"
                ],
                "indicator": [
                    "13.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_ADAP_COM_DV",
                "description": "Number of least developed countries and small island developing States with adaptation communications (Number)",
                "uri": "/v1/sdg/Series/EN_ADAP_COM_DV"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.b"
                ],
                "indicator": [
                    "13.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NAD_CONTR_DV",
                "description": "Number of least developed countries and small island developing States with nationally determined contributions (Number)",
                "uri": "/v1/sdg/Series/EN_NAD_CONTR_DV"
            },
            {
                "goal": [
                    "13"
                ],
                "target": [
                    "13.b"
                ],
                "indicator": [
                    "13.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_NAA_PLAN_DV",
                "description": "Number of least developed countries and small island developing States with national adaptation plans (Number)",
                "uri": "/v1/sdg/Series/EN_NAA_PLAN_DV"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.1",
        "code": "14.1.1",
        "description": "(a) Index of coastal eutrophication; and (b) plastic debris density",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/14.1.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_CHLDEV",
                "description": "Chlorophyll-a deviations, remote sensing (%)",
                "uri": "/v1/sdg/Series/EN_MAR_CHLDEV"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_CHLANM",
                "description": "Chlorophyll-a anomaly, remote sensing (%)",
                "uri": "/v1/sdg/Series/EN_MAR_CHLANM"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_BEALITSQ",
                "description": "Beach litter per square kilometer (Number)",
                "uri": "/v1/sdg/Series/EN_MAR_BEALITSQ"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_PLASDD",
                "description": "Floating plastic debris density (count per km2)",
                "uri": "/v1/sdg/Series/EN_MAR_PLASDD"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_BEALIT_BP",
                "description": "Beach litter originating from national land-based sources that ends in the beach (%)",
                "uri": "/v1/sdg/Series/EN_MAR_BEALIT_BP"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_BEALIT_BV",
                "description": "Beach litter originating from national land-based sources that ends in the beach (Tonnes)",
                "uri": "/v1/sdg/Series/EN_MAR_BEALIT_BV"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_BEALIT_OP",
                "description": "Beach litter originating from national land-based sources that ends in the ocean (%)",
                "uri": "/v1/sdg/Series/EN_MAR_BEALIT_OP"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_BEALIT_OV",
                "description": "Beach litter originating from national land-based sources that ends in the ocean (Tonnes)",
                "uri": "/v1/sdg/Series/EN_MAR_BEALIT_OV"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.1"
                ],
                "indicator": [
                    "14.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_MAR_BEALIT_EXP",
                "description": "Exported beach litter originating from national land-based sources (Tonnes)",
                "uri": "/v1/sdg/Series/EN_MAR_BEALIT_EXP"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.6",
        "code": "14.6.1",
        "description": "Degree of implementation of international instruments aiming to combat illegal, unreported and unregulated fishing",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/14.6.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.6"
                ],
                "indicator": [
                    "14.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_REG_UNFCIM",
                "description": "Progress by countries in the degree of implementation of international instruments aiming to combat illegal, unreported and unregulated fishing (level of implementation: 1 lowest to 5 highest)",
                "uri": "/v1/sdg/Series/ER_REG_UNFCIM"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.2",
        "code": "14.2.1",
        "description": "Number of countries using ecosystem-based approaches to managing marine areas",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/14.2.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.2"
                ],
                "indicator": [
                    "14.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_SCP_ECSYBA",
                "description": "Number of countries using ecosystem-based approaches to managing marine areas (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/EN_SCP_ECSYBA"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.7",
        "code": "14.7.1",
        "description": "Sustainable fisheries as a proportion of GDP in small island developing States, least developed countries and all countries",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/14.7.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.7"
                ],
                "indicator": [
                    "14.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "EN_SCP_FSHGDP",
                "description": "Sustainable fisheries as a proportion of GDP",
                "uri": "/v1/sdg/Series/EN_SCP_FSHGDP"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.3",
        "code": "14.3.1",
        "description": "Average marine acidity (pH) measured at agreed suite of representative sampling stations",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/14.3.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.3"
                ],
                "indicator": [
                    "14.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_OAW_MNACD",
                "description": "Average marine acidity (pH) measured at agreed suite of representative sampling stations",
                "uri": "/v1/sdg/Series/ER_OAW_MNACD"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.a",
        "code": "14.a.1",
        "description": "Proportion of total research budget allocated to research in the field of marine technology",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/14.a.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.a"
                ],
                "indicator": [
                    "14.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_RDE_OSEX",
                "description": "National ocean science expenditure as a share of total research and development funding (%)",
                "uri": "/v1/sdg/Series/ER_RDE_OSEX"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.4",
        "code": "14.4.1",
        "description": "Proportion of fish stocks within biologically sustainable levels",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/14.4.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.4"
                ],
                "indicator": [
                    "14.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_H2O_FWTL",
                "description": "Proportion of fish stocks within biologically sustainable levels (not overexploited) (%)",
                "uri": "/v1/sdg/Series/ER_H2O_FWTL"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.b",
        "code": "14.b.1",
        "description": "Degree of application of a legal/regulatory/policy/institutional framework which recognizes and protects access rights for small-scale fisheries",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/14.b.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.b"
                ],
                "indicator": [
                    "14.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_REG_SSFRAR",
                "description": "Degree of application of a legal/regulatory/policy/institutional framework which recognizes and protects access rights for small-scale fisheries (level of implementation: 1 lowest to 5 highest)",
                "uri": "/v1/sdg/Series/ER_REG_SSFRAR"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.5",
        "code": "14.5.1",
        "description": "Coverage of protected areas in relation to marine areas",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/14.5.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.5"
                ],
                "indicator": [
                    "14.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_MRN_MARINT",
                "description": "Protected marine area (Exclusive Economic Zones) (square kilometres)",
                "uri": "/v1/sdg/Series/ER_MRN_MARINT"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.5"
                ],
                "indicator": [
                    "14.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_MRN_MARIN",
                "description": "Coverage of protected areas in relation to marine areas (Exclusive Economic Zones) (%)",
                "uri": "/v1/sdg/Series/ER_MRN_MARIN"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.5"
                ],
                "indicator": [
                    "14.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_MRN_MPA",
                "description": "Average proportion of Marine Key Biodiversity Areas (KBAs) covered by protected areas (%)",
                "uri": "/v1/sdg/Series/ER_MRN_MPA"
            }
        ]
    },
    {
        "goal": "14",
        "target": "14.c",
        "code": "14.c.1",
        "description": "Number of countries making progress in ratifying, accepting and implementing through legal, policy and institutional frameworks, ocean-related instruments that implement international law, as reflected in the United Nations Convention on the Law of the Sea, for the conservation and sustainable use of the oceans and their resources",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/14.c.1",
        "series": [
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.c"
                ],
                "indicator": [
                    "14.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_UNCLOS_RATACC",
                "description": "Score for the ratification of and accession to UNCLOS and its two implementing agreements (%)",
                "uri": "/v1/sdg/Series/ER_UNCLOS_RATACC"
            },
            {
                "goal": [
                    "14"
                ],
                "target": [
                    "14.c"
                ],
                "indicator": [
                    "14.c.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_UNCLOS_IMPLE",
                "description": "Score for the implementation of UNCLOS and its two implementing agreements (%)",
                "uri": "/v1/sdg/Series/ER_UNCLOS_IMPLE"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.1",
        "code": "15.1.1",
        "description": "Forest area as a proportion of total land area",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.1.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.1"
                ],
                "indicator": [
                    "15.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_TOTL",
                "description": "Land area (thousands of hectares)",
                "uri": "/v1/sdg/Series/AG_LND_TOTL"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.1"
                ],
                "indicator": [
                    "15.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRSTN",
                "description": "Forest area (thousands of hectares)",
                "uri": "/v1/sdg/Series/AG_LND_FRSTN"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.1"
                ],
                "indicator": [
                    "15.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRST",
                "description": "Forest area as a proportion of total land area (%)",
                "uri": "/v1/sdg/Series/AG_LND_FRST"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.1",
        "code": "15.1.2",
        "description": "Proportion of important sites for terrestrial and freshwater biodiversity that are covered by protected areas, by ecosystem type",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.1.2",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.1"
                ],
                "indicator": [
                    "15.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_PTD_FRHWTR",
                "description": "Average proportion of Freshwater Key Biodiversity Areas (KBAs) covered by protected areas (%)",
                "uri": "/v1/sdg/Series/ER_PTD_FRHWTR"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.1"
                ],
                "indicator": [
                    "15.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_PTD_TERR",
                "description": "Average proportion of Terrestrial Key Biodiversity Areas (KBAs) covered by protected areas (%)",
                "uri": "/v1/sdg/Series/ER_PTD_TERR"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.2",
        "code": "15.2.1",
        "description": "Progress towards sustainable forest management",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.2.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.2"
                ],
                "indicator": [
                    "15.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRSTBIOPHA",
                "description": "Above-ground biomass in forest (tonnes per hectare)",
                "uri": "/v1/sdg/Series/AG_LND_FRSTBIOPHA"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.2"
                ],
                "indicator": [
                    "15.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRSTCERT",
                "description": "Forest area under an independently verified forest management certification scheme (thousands of hectares)",
                "uri": "/v1/sdg/Series/AG_LND_FRSTCERT"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.2"
                ],
                "indicator": [
                    "15.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRSTCHG",
                "description": "Annual forest area change rate (%)",
                "uri": "/v1/sdg/Series/AG_LND_FRSTCHG"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.2"
                ],
                "indicator": [
                    "15.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRSTMGT",
                "description": "Proportion of forest area with a long-term management plan (%)",
                "uri": "/v1/sdg/Series/AG_LND_FRSTMGT"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.2"
                ],
                "indicator": [
                    "15.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_FRSTPRCT",
                "description": "Proportion of forest area within legally established protected areas (%)",
                "uri": "/v1/sdg/Series/AG_LND_FRSTPRCT"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.3",
        "code": "15.3.1",
        "description": "Proportion of land that is degraded over total land area",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.3.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.3"
                ],
                "indicator": [
                    "15.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "AG_LND_DGRD",
                "description": "Proportion of land that is degraded over total land area (%)",
                "uri": "/v1/sdg/Series/AG_LND_DGRD"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.4",
        "code": "15.4.1",
        "description": "Coverage by protected areas of important sites for mountain biodiversity",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.4.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.4"
                ],
                "indicator": [
                    "15.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_PTD_MTN",
                "description": "Average proportion of Mountain Key Biodiversity Areas (KBAs) covered by protected areas (%)",
                "uri": "/v1/sdg/Series/ER_PTD_MTN"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.4",
        "code": "15.4.2",
        "description": "Mountain Green Cover Index",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.4.2",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.4"
                ],
                "indicator": [
                    "15.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_MTN_GRNCVI",
                "description": "Mountain Green Cover Index",
                "uri": "/v1/sdg/Series/ER_MTN_GRNCVI"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.5",
        "code": "15.5.1",
        "description": "Red List Index",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.5.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.5"
                ],
                "indicator": [
                    "15.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_RSK_LST",
                "description": "Red List Index",
                "uri": "/v1/sdg/Series/ER_RSK_LST"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.6",
        "code": "15.6.1",
        "description": "Number of countries that have adopted legislative, administrative and policy frameworks to ensure fair and equitable sharing of benefits",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.6.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.6"
                ],
                "indicator": [
                    "15.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_CBD_SMTA",
                "description": "Total reported number of Standard Material Transfer Agreements (SMTAs) transferring plant genetic resources for food and agriculture to the country (number)",
                "uri": "/v1/sdg/Series/ER_CBD_SMTA"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.6"
                ],
                "indicator": [
                    "15.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_CBD_NAGOYA",
                "description": "Countries that are parties to the Nagoya Protocol (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/ER_CBD_NAGOYA"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.6"
                ],
                "indicator": [
                    "15.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_CBD_ABSCLRHS",
                "description": "Countries that have legislative, administrative and policy framework or measures reported to the Access and Benefit-Sharing Clearing-House (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/ER_CBD_ABSCLRHS"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.6"
                ],
                "indicator": [
                    "15.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_CBD_ORSPGRFA",
                "description": "Countries that have legislative, administrative and policy framework or measures reported through the Online Reporting System on Compliance  of the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/ER_CBD_ORSPGRFA"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.6"
                ],
                "indicator": [
                    "15.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_CBD_PTYPGRFA",
                "description": "Countries that are contracting Parties to the International Treaty on Plant Genetic Resources for Food and Agriculture (PGRFA) (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/ER_CBD_PTYPGRFA"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.7",
        "code": "15.7.1",
        "description": "Proportion of traded wildlife that was poached or illicitly trafficked",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/15.7.1",
        "series": []
    },
    {
        "goal": "15",
        "target": "15.8",
        "code": "15.8.1",
        "description": "Proportion of countries adopting relevant national legislation and adequately resourcing the prevention or control of invasive alien species",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.8.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_LEGIS",
                "description": "Legislation, Regulation, Act related to the prevention of introduction and management of Invasive Alien Species (1 = YES, 0 = NO)",
                "uri": "/v1/sdg/Series/ER_IAS_LEGIS"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_NBSAP",
                "description": "National Biodiversity Strategy and Action Plan (NBSAP) targets alignment to Aichi Biodiversity target 9 set out in the Strategic Plan for Biodiversity 2011-2020 (1 = YES, 0 = NO)",
                "uri": "/v1/sdg/Series/ER_IAS_NBSAP"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_NATBUD",
                "description": "Countries with an allocation from the national budget to manage the threat of invasive alien species (1 = YES, 0 = NO)",
                "uri": "/v1/sdg/Series/ER_IAS_NATBUD"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_GLOFUN",
                "description": "Recipient countries of global funding with access to any funding from global financial mechanisms for projects related to invasive alien species  management (1 = YES, 0 = NO)",
                "uri": "/v1/sdg/Series/ER_IAS_GLOFUN"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_NBSAPP",
                "description": "Proportion of countries with National Biodiversity Strategy and Action Plan (NBSAP) targets alignment to Aichi Biodiversity target 9 set out in the Strategic Plan for Biodiversity 2011-2020 (%)",
                "uri": "/v1/sdg/Series/ER_IAS_NBSAPP"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_NATBUDP",
                "description": "Proportion of countries with allocation from the national budget to manage the threat of invasive alien species (%)",
                "uri": "/v1/sdg/Series/ER_IAS_NATBUDP"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.8"
                ],
                "indicator": [
                    "15.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_IAS_GLOFUNP",
                "description": "Proportion of recipient countries of global funding with access to any funding from global financial mechanisms for projects related to invasive alien species  management (%)",
                "uri": "/v1/sdg/Series/ER_IAS_GLOFUNP"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.9",
        "code": "15.9.1",
        "description": "(a) Number of countries that have established national targets in accordance with or similar to Aichi Biodiversity Target 2 of the Strategic Plan for Biodiversity 2011???2020 in their national biodiversity strategy and action plans and the progress reported towards these targets; and (b) integration of biodiversity into national accounting and reporting systems, defined as implementation of the System of Environmental-Economic Accounting",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/15.9.1",
        "series": [
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.9"
                ],
                "indicator": [
                    "15.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_BDY_ABT2NP",
                "description": "Countries that established national targets in accordance with Aichi Biodiversity Target 2 of the Strategic Plan for Biodiversity 2011-2020 in their National Biodiversity Strategy and Action Plans (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/ER_BDY_ABT2NP"
            },
            {
                "goal": [
                    "15"
                ],
                "target": [
                    "15.9"
                ],
                "indicator": [
                    "15.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "ER_BDY_SEEA",
                "description": "Countries with integrated biodiversity values into national accounting and reporting systems, defined as implementation of the System of Environmental-Economic Accounting  (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/ER_BDY_SEEA"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.a",
        "code": "15.a.1",
        "description": "(a) Official development assistance on conservation and sustainable use of biodiversity; and (b) revenue generated and finance mobilized from biodiversity-relevant economic instruments",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.a.1",
        "series": [
            {
                "goal": [
                    "15",
                    "15"
                ],
                "target": [
                    "15.a",
                    "15.b"
                ],
                "indicator": [
                    "15.a.1",
                    "15.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_BDVDL",
                "description": "Total official development assistance for biodiversity, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_BDVDL"
            },
            {
                "goal": [
                    "15",
                    "15"
                ],
                "target": [
                    "15.a",
                    "15.b"
                ],
                "indicator": [
                    "15.a.1",
                    "15.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_BDVL",
                "description": "Total official development assistance for biodiversity, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_BDVL"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.b",
        "code": "15.b.1",
        "description": "(a) Official development assistance on conservation and sustainable use of biodiversity; and (b) revenue generated and finance mobilized from biodiversity-relevant economic instruments",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/15.b.1",
        "series": [
            {
                "goal": [
                    "15",
                    "15"
                ],
                "target": [
                    "15.a",
                    "15.b"
                ],
                "indicator": [
                    "15.a.1",
                    "15.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_BDVDL",
                "description": "Total official development assistance for biodiversity, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_BDVDL"
            },
            {
                "goal": [
                    "15",
                    "15"
                ],
                "target": [
                    "15.a",
                    "15.b"
                ],
                "indicator": [
                    "15.a.1",
                    "15.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_BDVL",
                "description": "Total official development assistance for biodiversity, by recipient countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_BDVL"
            }
        ]
    },
    {
        "goal": "15",
        "target": "15.c",
        "code": "15.c.1",
        "description": "Proportion of traded wildlife that was poached or illicitly trafficked",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/15.c.1",
        "series": []
    },
    {
        "goal": "16",
        "target": "16.1",
        "code": "16.1.1",
        "description": "Number of victims of intentional homicide per 100,000 population, by sex and age",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.1.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_IHR_PSRC",
                "description": "Number of victims of intentional homicide per 100,000 population, by sex (victims per 100,000 population)",
                "uri": "/v1/sdg/Series/VC_IHR_PSRC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_IHR_PSRCN",
                "description": "Number of victims of intentional homicide, by sex (number)",
                "uri": "/v1/sdg/Series/VC_IHR_PSRCN"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.1",
        "code": "16.1.3",
        "description": "Proportion of population subjected to (a) physical violence, (b) psychological violence and (c) sexual violence in the previous 12 months",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.1.3",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VOV_PHYL",
                "description": "Proportion of population subjected to physical violence in the previous 12 months, by sex (%)",
                "uri": "/v1/sdg/Series/VC_VOV_PHYL"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VOV_ROBB",
                "description": "Proportion of population subjected to robbery in the previous 12 months, by sex (%)",
                "uri": "/v1/sdg/Series/VC_VOV_ROBB"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VOV_SEXL",
                "description": "Proportion of population subjected to sexual violence in the previous 12 months, by sex (%)",
                "uri": "/v1/sdg/Series/VC_VOV_SEXL"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.1",
        "code": "16.1.4",
        "description": "Proportion of population that feel safe walking alone around the area they live after dark",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.1.4",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.4"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_SNS_WALN_DRK",
                "description": "Proportion of population that feel safe walking alone around the area they live after dark (%)",
                "uri": "/v1/sdg/Series/VC_SNS_WALN_DRK"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.1",
        "code": "16.1.2",
        "description": "Conflict-related deaths per 100,000 population, by sex, age and cause",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.1.2",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DTH_TOCVN",
                "description": "Number of conflict-related deaths (civilians), by sex, age and cause of death (Number)",
                "uri": "/v1/sdg/Series/VC_DTH_TOCVN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DTH_TOTR",
                "description": "Number of total conflict-related deaths per 100,000 population (Per 100,000 population)",
                "uri": "/v1/sdg/Series/VC_DTH_TOTR"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DTH_TOTN",
                "description": "Number of total conflict-related deaths, by sex, age and cause of death (Number)",
                "uri": "/v1/sdg/Series/VC_DTH_TOTN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DTH_TOUNN",
                "description": "Number of conflict-related deaths (unknown), by sex, age and cause of death (Number)",
                "uri": "/v1/sdg/Series/VC_DTH_TOUNN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DTH_TONCVN",
                "description": "Number of conflict-related deaths (non-civilians), by sex, age and cause of death (Number)",
                "uri": "/v1/sdg/Series/VC_DTH_TONCVN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.1"
                ],
                "indicator": [
                    "16.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_DTH_TOTPT",
                "description": "Conflict-related total death rate, by sex, age and cause of death (%)",
                "uri": "/v1/sdg/Series/VC_DTH_TOTPT"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.2",
        "code": "16.2.1",
        "description": "Proportion of children aged 1-17 years who experienced any physical punishment and/or psychological aggression by caregivers in the past month",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.2.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VAW_PHYPYV",
                "description": "Proportion of children aged 1-14 years who experienced physical punishment and/or psychological aggression by caregivers in last month (% of children aged 1-14 years)",
                "uri": "/v1/sdg/Series/VC_VAW_PHYPYV"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.2",
        "code": "16.2.2",
        "description": "Number of victims of human trafficking per 100,000 population, by sex, age and form of exploitation",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.2.2",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_HTF_DETVFL",
                "description": "Detected victims of human trafficking for forced labour, servitude and slavery, by age and sex (number)",
                "uri": "/v1/sdg/Series/VC_HTF_DETVFL"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_HTF_DETVOP",
                "description": "Detected victims of human trafficking for other purposes, by age and sex (number)",
                "uri": "/v1/sdg/Series/VC_HTF_DETVOP"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_HTF_DETVOG",
                "description": "Detected victims of human trafficking for removal of organ, by age and sex (number)",
                "uri": "/v1/sdg/Series/VC_HTF_DETVOG"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_HTF_DETVSX",
                "description": "Detected victims of human trafficking for sexual exploitaton, by age and sex (number)",
                "uri": "/v1/sdg/Series/VC_HTF_DETVSX"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_HTF_DETV",
                "description": "Detected victims of human trafficking, by age and sex (number)",
                "uri": "/v1/sdg/Series/VC_HTF_DETV"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.2",
        "code": "16.2.3",
        "description": "Proportion of young women and men aged 18-29 years who experienced sexual violence by age 18",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.2.3",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.2"
                ],
                "indicator": [
                    "16.2.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VAW_SXVLN",
                "description": "Proportion of population aged 18-29 years who experienced sexual violence by age 18, by sex (% of population aged 18-29)",
                "uri": "/v1/sdg/Series/VC_VAW_SXVLN"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.3",
        "code": "16.3.2",
        "description": "Unsentenced detainees as a proportion of overall prison population",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/16.3.2",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.3"
                ],
                "indicator": [
                    "16.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_PRS_UNSNT",
                "description": "Unsentenced detainees as a proportion of overall prison population (%)",
                "uri": "/v1/sdg/Series/VC_PRS_UNSNT"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.3",
        "code": "16.3.1",
        "description": "Proportion of victims of violence in the previous 12 months who reported their victimization to competent authorities or other officially recognized conflict resolution mechanisms",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.3.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.3"
                ],
                "indicator": [
                    "16.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_PRR_PHYV",
                "description": "Police reporting rate for physical assault, by sex (%)",
                "uri": "/v1/sdg/Series/VC_PRR_PHYV"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.3"
                ],
                "indicator": [
                    "16.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_PRR_SEXV",
                "description": "Police reporting rate for sexual assault, by sex (%)",
                "uri": "/v1/sdg/Series/VC_PRR_SEXV"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.3"
                ],
                "indicator": [
                    "16.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_PRR_ROBB",
                "description": "Police reporting rate for robbery, by sex (%)",
                "uri": "/v1/sdg/Series/VC_PRR_ROBB"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.3",
        "code": "16.3.3",
        "description": "Proportion of the population who have experienced a dispute in the past two years and who accessed a formal or informal dispute resolution mechanism, by type of mechanism",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.3.3",
        "series": []
    },
    {
        "goal": "16",
        "target": "16.4",
        "code": "16.4.2",
        "description": "Proportion of seized, found or surrendered arms whose illicit origin or context has been traced or established by a competent authority in line with international instruments",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.4.2",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.4"
                ],
                "indicator": [
                    "16.4.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_ARM_SZTRACE",
                "description": "Proportion of seized, found or surrendered arms whose illicit origin or context has been traced or established by a competent authority in line with international instruments",
                "uri": "/v1/sdg/Series/VC_ARM_SZTRACE"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.4",
        "code": "16.4.1",
        "description": "Total value of inward and outward illicit financial flows (in current United States dollars)",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.4.1",
        "series": []
    },
    {
        "goal": "16",
        "target": "16.5",
        "code": "16.5.2",
        "description": "Proportion of businesses that had at least one contact with a public official and that paid a bribe to a public official, or were asked for a bribe by those public officials during the previous 12 months",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/16.5.2",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.5"
                ],
                "indicator": [
                    "16.5.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "IC_FRM_BRIB",
                "description": "Bribery incidence (% of firms experiencing at least one bribe payment request)",
                "uri": "/v1/sdg/Series/IC_FRM_BRIB"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.5",
        "code": "16.5.1",
        "description": "Proportion of persons who had at least one contact with a public official and who paid a bribe to a public official, or were asked for a bribe by those public officials, during the previous 12 months",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.5.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.5"
                ],
                "indicator": [
                    "16.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IU_COR_BRIB",
                "description": "Prevalence rate of bribery, by sex (%)",
                "uri": "/v1/sdg/Series/IU_COR_BRIB"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.6",
        "code": "16.6.1",
        "description": "Primary government expenditures as a proportion of original approved budget, by sector (or by budget codes or similar)",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.6.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.6"
                ],
                "indicator": [
                    "16.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GF_XPD_GBPC",
                "description": "Primary government expenditures as a proportion of original approved budget (%)",
                "uri": "/v1/sdg/Series/GF_XPD_GBPC"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.6",
        "code": "16.6.2",
        "description": "Proportion of population satisfied with their last experience of public services",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.6.2",
        "series": []
    },
    {
        "goal": "16",
        "target": "16.7",
        "code": "16.7.1",
        "description": "Proportions of positions in national and local institutions, including (a) the legislatures; (b) the public service; and (c) the judiciary, compared to national distributions, by sex, age, persons with disabilities and population groups",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.7.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLCC_JC",
                "description": "Number of chairs of permanent committees, by age sex and focus of the committee, Joint Committees",
                "uri": "/v1/sdg/Series/SG_DMK_PARLCC_JC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLMP_LC",
                "description": "Ratio for female members of parliaments (Ratio of the proportion of women in parliament in the proportion of women in the national population with the age of eligibility as a lower bound boundary), Lower Chamber or Unicameral",
                "uri": "/v1/sdg/Series/SG_DMK_PARLMP_LC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLSP_LC",
                "description": "Number of speakers in parliament, by age and sex , Lower Chamber or Unicameral",
                "uri": "/v1/sdg/Series/SG_DMK_PARLSP_LC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLCC_LC",
                "description": "Number of chairs of permanent committees, by age sex and focus of the committee, Lower Chamber or Unicameral",
                "uri": "/v1/sdg/Series/SG_DMK_PARLCC_LC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLMP_UC",
                "description": "Ratio for female members of parliaments (Ratio of the proportion of women in parliament in the proportion of women in the national population with the age of eligibility as a lower bound boundary), Upper Chamber",
                "uri": "/v1/sdg/Series/SG_DMK_PARLMP_UC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLSP_UC",
                "description": "Number of speakers in parliament, by age and sex, Upper Chamber",
                "uri": "/v1/sdg/Series/SG_DMK_PARLSP_UC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLCC_UC",
                "description": "Number of chairs of permanent committees, by age sex and focus of the committee, Upper Chamber",
                "uri": "/v1/sdg/Series/SG_DMK_PARLCC_UC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLYR_LC",
                "description": "Ratio of young members in parliament (Ratio of the proportion of young members in parliament (age 45 or below) in the proportion of the national population (age 45 or below) with the age of eligibility as a lower bound boundary), Lower Chamber or Unicameral",
                "uri": "/v1/sdg/Series/SG_DMK_PARLYR_LC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLYP_LC",
                "description": "Proportion of youth in parliament (age 45 or below), Lower Chamber or Unicameral (%)",
                "uri": "/v1/sdg/Series/SG_DMK_PARLYP_LC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLYN_LC",
                "description": "Number of youth in parliament (age 45 or below), Lower Chamber or Unicameral (Number)",
                "uri": "/v1/sdg/Series/SG_DMK_PARLYN_LC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLYR_UC",
                "description": "Ratio of young members in parliament (Ratio of the proportion of young members in parliament (age 45 or below) in the proportion of the national population (age 45 or below) with the age of eligibility as a lower bound boundary), Upper Chamber",
                "uri": "/v1/sdg/Series/SG_DMK_PARLYR_UC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLYP_UC",
                "description": "Proportion of youth in parliament (age 45 or below), Upper Chamber (%)",
                "uri": "/v1/sdg/Series/SG_DMK_PARLYP_UC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PARLYN_UC",
                "description": "Number of youth in parliament (age 45 or below), Upper Chamber (Number)",
                "uri": "/v1/sdg/Series/SG_DMK_PARLYN_UC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_PSRVC",
                "description": "Proportions of positions in the public service compared to national distributions (ratio)",
                "uri": "/v1/sdg/Series/SG_DMK_PSRVC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_JDC",
                "description": "Proportions of positions in the judiciary compared to national distributions (ratio)",
                "uri": "/v1/sdg/Series/SG_DMK_JDC"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_JDC_HGR",
                "description": "Proportions of positions in the judiciary compared to national distributions, Higher Courts (ratio)",
                "uri": "/v1/sdg/Series/SG_DMK_JDC_HGR"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_JDC_LWR",
                "description": "Proportions of positions in the judiciary compared to national distributions, Lower Courts (ratio)",
                "uri": "/v1/sdg/Series/SG_DMK_JDC_LWR"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.7"
                ],
                "indicator": [
                    "16.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_DMK_JDC_CNS",
                "description": "Proportions of positions in the judiciary compared to national distributions, Constitutional Court (ratio)",
                "uri": "/v1/sdg/Series/SG_DMK_JDC_CNS"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.7",
        "code": "16.7.2",
        "description": "Proportion of population who believe decision-making is inclusive and responsive, by sex, age, disability and population group",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.7.2",
        "series": []
    },
    {
        "goal": "16",
        "target": "16.8",
        "code": "16.8.1",
        "description": "Proportion of members and voting rights of developing countries in international organizations",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/16.8.1",
        "series": [
            {
                "goal": [
                    "10",
                    "16"
                ],
                "target": [
                    "10.6",
                    "16.8"
                ],
                "indicator": [
                    "10.6.1",
                    "16.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_INT_MBRDEV",
                "description": "Proportion of members of developing countries in international organizations, by organization (%)",
                "uri": "/v1/sdg/Series/SG_INT_MBRDEV"
            },
            {
                "goal": [
                    "10",
                    "16"
                ],
                "target": [
                    "10.6",
                    "16.8"
                ],
                "indicator": [
                    "10.6.1",
                    "16.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_INT_VRTDEV",
                "description": "Proportion of voting rights of developing countries in international organizations, by organization (%)",
                "uri": "/v1/sdg/Series/SG_INT_VRTDEV"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.9",
        "code": "16.9.1",
        "description": "Proportion of children under 5 years of age whose births have been registered with a civil authority, by age",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/16.9.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.9"
                ],
                "indicator": [
                    "16.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_BRTH",
                "description": "Proportion of children under 5 years of age whose births have been registered with a civil authority (% of children under 5 years of age)",
                "uri": "/v1/sdg/Series/SG_REG_BRTH"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.10",
        "code": "16.10.1",
        "description": "Number of verified cases of killing, kidnapping, enforced disappearance, arbitrary detention and torture of journalists, associated media personnel, trade unionists and human rights advocates in the previous 12 months",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.10.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.10"
                ],
                "indicator": [
                    "16.10.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VAW_MTUHRA",
                "description": "Number of cases of killings of human rights defenders, journalists and trade unionists",
                "uri": "/v1/sdg/Series/VC_VAW_MTUHRA"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.10"
                ],
                "indicator": [
                    "16.10.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VOC_ENFDIS",
                "description": "Number of cases of enforced disappearance of human rights defenders, journalists and trade unionists (Number)",
                "uri": "/v1/sdg/Series/VC_VOC_ENFDIS"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.10",
        "code": "16.10.2",
        "description": "Number of countries that adopt and implement constitutional, statutory and/or policy guarantees for public access to information",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/16.10.2",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.10"
                ],
                "indicator": [
                    "16.10.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_INF_ACCSS",
                "description": "Countries that adopt and implement constitutional, statutory and/or policy guarantees for public access to information",
                "uri": "/v1/sdg/Series/SG_INF_ACCSS"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.a",
        "code": "16.a.1",
        "description": "Existence of independent national human rights institutions in compliance with the Paris Principles",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/16.a.1",
        "series": [
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.a"
                ],
                "indicator": [
                    "16.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_NHR_IMPL",
                "description": "Proportion of countries with independent National Human Rights Institutions in compliance with the Paris Principles (%)",
                "uri": "/v1/sdg/Series/SG_NHR_IMPL"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.a"
                ],
                "indicator": [
                    "16.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_NHR_IMPLN",
                "description": "Countries with National Human Rights Institutions in compliance with the Paris Principles, A status (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_NHR_IMPLN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.a"
                ],
                "indicator": [
                    "16.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_NHR_INTEXST",
                "description": "Proportion of countries that applied for accreditation as independent National Human Rights Institutions in compliance with the Paris Principles (%)",
                "uri": "/v1/sdg/Series/SG_NHR_INTEXST"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.a"
                ],
                "indicator": [
                    "16.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_NHR_NOSTUSN",
                "description": "Countries with National Human Rights Institutions and no status with the Paris Principles, C status (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_NHR_NOSTUSN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.a"
                ],
                "indicator": [
                    "16.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_NHR_INTEXSTN",
                "description": "Countries with National Human Rights Institutions not fully compliant with the Paris Principles, B status (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_NHR_INTEXSTN"
            },
            {
                "goal": [
                    "16"
                ],
                "target": [
                    "16.a"
                ],
                "indicator": [
                    "16.a.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_NHR_NOAPPLN",
                "description": "Countries with no application for accreditation with the Paris Principles, D status  (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_NHR_NOAPPLN"
            }
        ]
    },
    {
        "goal": "16",
        "target": "16.b",
        "code": "16.b.1",
        "description": "Proportion of population reporting having personally felt discriminated against or harassed in the previous 12 months on the basis of a ground of discrimination prohibited under international human rights law",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/16.b.1",
        "series": [
            {
                "goal": [
                    "10",
                    "16"
                ],
                "target": [
                    "10.3",
                    "16.b"
                ],
                "indicator": [
                    "10.3.1",
                    "16.b.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "VC_VOV_GDSD",
                "description": "Proportion of population reporting having felt discriminated against, by grounds of discrimination, sex and disability (%)",
                "uri": "/v1/sdg/Series/VC_VOV_GDSD"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.1",
        "code": "17.1.1",
        "description": "Total government revenue as a proportion of GDP, by source",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.1.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.1"
                ],
                "indicator": [
                    "17.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GR_G14_GDP",
                "description": "Total government revenue (budgetary central government) as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/GR_G14_GDP"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.1"
                ],
                "indicator": [
                    "17.1.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GR_G14_XDC",
                "description": "Total government revenue, in local currency",
                "uri": "/v1/sdg/Series/GR_G14_XDC"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.1",
        "code": "17.1.2",
        "description": "Proportion of domestic budget funded by domestic taxes",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.1.2",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.1"
                ],
                "indicator": [
                    "17.1.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "GC_GOB_TAXD",
                "description": "Proportion of domestic budget funded by domestic taxes (% of GDP)",
                "uri": "/v1/sdg/Series/GC_GOB_TAXD"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.2",
        "code": "17.2.1",
        "description": "Net official development assistance, total and to least developed countries, as a proportion of the Organization for Economic Cooperation and Development (OECD) Development Assistance Committee donors??? gross national income (GNI)",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.2.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_SIDSG",
                "description": "Net official development assistance (ODA) to small island states (SIDS) as a percentage of OECD-DAC donors' GNI, by donor countries (%)",
                "uri": "/v1/sdg/Series/DC_ODA_SIDSG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_LDCG",
                "description": "Net official development assistance (ODA) to LDCs as a percentage of OECD-DAC donors' GNI, by donor countries (%)",
                "uri": "/v1/sdg/Series/DC_ODA_LDCG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_LLDC",
                "description": "Net official development assistance (ODA) to landlocked developing countries from OECD-DAC countries, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_LLDC"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_SIDS",
                "description": "Net official development assistance (ODA) to small island states (SIDS) from OECD-DAC countries, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_SIDS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_LDCS",
                "description": "Net official development assistance (ODA) to LDCs from OECD-DAC countries, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_LDCS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_LLDCG",
                "description": "Net official development assistance (ODA) to landlocked developing countries as a percentage of OECD-DAC donors' GNI, by donor countries (%)",
                "uri": "/v1/sdg/Series/DC_ODA_LLDCG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_TOTG",
                "description": "Net official development assistance (ODA) as a percentage of OECD-DAC donors' GNI, by donor countries (%)",
                "uri": "/v1/sdg/Series/DC_ODA_TOTG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_TOTL",
                "description": "Net official development assistance (ODA) from OECD-DAC countries, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_TOTL"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_TOTLGE",
                "description": "Official development assistance (ODA) from OECD-DAC countries on grant equivalent basis, by donor countries (millions of constant 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_ODA_TOTLGE"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.2"
                ],
                "indicator": [
                    "17.2.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ODA_TOTGGE",
                "description": "Official development assistance (ODA) as a percentage of OECD-DAC donors' GNI on grant equivalent basis, by donor countries (%)",
                "uri": "/v1/sdg/Series/DC_ODA_TOTGGE"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.3",
        "code": "17.3.2",
        "description": "Volume of remittances (in United States dollars) as a proportion of total GDP",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.3.2",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.3"
                ],
                "indicator": [
                    "17.3.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "BX_TRF_PWKR",
                "description": "Volume of remittances (in United States dollars) as a proportion of total GDP (%)",
                "uri": "/v1/sdg/Series/BX_TRF_PWKR"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.3",
        "code": "17.3.1",
        "description": "Additional financial resources mobilized for developing countries from multiple sources",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.3.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.3"
                ],
                "indicator": [
                    "17.3.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GF_FRN_FDI",
                "description": "Foreign direct investment (FDI) inflows (millions of US dollars)",
                "uri": "/v1/sdg/Series/GF_FRN_FDI"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.4",
        "code": "17.4.1",
        "description": "Debt service as a proportion of exports of goods and services",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.4.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.4"
                ],
                "indicator": [
                    "17.4.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DT_TDS_DECT",
                "description": "Debt service as a proportion of exports of goods and services (%)",
                "uri": "/v1/sdg/Series/DT_TDS_DECT"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.5",
        "code": "17.5.1",
        "description": "Number of countries that adopt and implement investment promotion regimes for developing countries, including the least developed countries",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.5.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.5"
                ],
                "indicator": [
                    "17.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_CPA_SIGN_BIT",
                "description": "Number of countries with a signed bilateral investment treaty (BIT) with least developed countries and developing countries (Number)",
                "uri": "/v1/sdg/Series/SG_CPA_SIGN_BIT"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.5"
                ],
                "indicator": [
                    "17.5.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_CPA_INFORCE_BIT",
                "description": "Number of countries with an in-force bilateral investment treaty (BIT) with least developed countries and developing countries (Number)",
                "uri": "/v1/sdg/Series/SG_CPA_INFORCE_BIT"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.6",
        "code": "17.6.1",
        "description": "Fixed Internet broadband subscriptions per 100 inhabitants, by speed",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.6.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.6"
                ],
                "indicator": [
                    "17.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_NET_BBNDN",
                "description": "Number of fixed Internet broadband subscriptions, by speed (number)",
                "uri": "/v1/sdg/Series/IT_NET_BBNDN"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.6"
                ],
                "indicator": [
                    "17.6.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_NET_BBND",
                "description": "Fixed Internet broadband subscriptions per 100 inhabitants, by speed (per 100 inhabitants)",
                "uri": "/v1/sdg/Series/IT_NET_BBND"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.7",
        "code": "17.7.1",
        "description": "Total amount of funding for developing countries to promote the development, transfer, dissemination and diffusion of environmentally sound technologies",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.7.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.7"
                ],
                "indicator": [
                    "17.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ENVTECH_EXP",
                "description": "Amount of tracked exported Environmentally Sound Technologies (current United States dollars)",
                "uri": "/v1/sdg/Series/DC_ENVTECH_EXP"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.7"
                ],
                "indicator": [
                    "17.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ENVTECH_IMP",
                "description": "Amount of tracked imported Environmentally Sound Technologies (current United States dollars)",
                "uri": "/v1/sdg/Series/DC_ENVTECH_IMP"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.7"
                ],
                "indicator": [
                    "17.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ENVTECH_REXP",
                "description": "Amount of tracked re-exported Environmentally Sound Technologies (current United States dollars)",
                "uri": "/v1/sdg/Series/DC_ENVTECH_REXP"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.7"
                ],
                "indicator": [
                    "17.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ENVTECH_RIMP",
                "description": "Amount of tracked re-imported Environmentally Sound Technologies (current United States dollars)",
                "uri": "/v1/sdg/Series/DC_ENVTECH_RIMP"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.7"
                ],
                "indicator": [
                    "17.7.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_ENVTECH_INV",
                "description": "Total investment in Environment Sound Technologies, by sector (current United States dollars)",
                "uri": "/v1/sdg/Series/DC_ENVTECH_INV"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.8",
        "code": "17.8.1",
        "description": "Proportion of individuals using the Internet",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.8.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.8"
                ],
                "indicator": [
                    "17.8.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "IT_USE_ii99",
                "description": "Internet users per 100 inhabitants",
                "uri": "/v1/sdg/Series/IT_USE_ii99"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.9",
        "code": "17.9.1",
        "description": "Dollar value of financial and technical assistance (including through North-South, South-South and triangular cooperation) committed to developing countries",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.9.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.9"
                ],
                "indicator": [
                    "17.9.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DC_FTA_TOTAL",
                "description": "Total official development assistance (gross disbursement) for technical cooperation (millions of 2020 United States dollars)",
                "uri": "/v1/sdg/Series/DC_FTA_TOTAL"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.10",
        "code": "17.10.1",
        "description": "Worldwide weighted tariff-average",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.10.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.10"
                ],
                "indicator": [
                    "17.10.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TM_TAX_WMFN",
                "description": "Worldwide weighted tariff-average, most-favoured-nation status, by type of product (%)",
                "uri": "/v1/sdg/Series/TM_TAX_WMFN"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.10"
                ],
                "indicator": [
                    "17.10.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TM_TAX_WMPS",
                "description": "Worldwide weighted tariff-average, preferential status, by type of product (%)",
                "uri": "/v1/sdg/Series/TM_TAX_WMPS"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.11",
        "code": "17.11.1",
        "description": "Developing countries??? and least developed countries??? share of global exports",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.11.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.11"
                ],
                "indicator": [
                    "17.11.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TX_IMP_GBMRCH",
                "description": "Developing countries??? and least developed countries??? share of global merchandise imports (%)",
                "uri": "/v1/sdg/Series/TX_IMP_GBMRCH"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.11"
                ],
                "indicator": [
                    "17.11.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TX_EXP_GBMRCH",
                "description": "Developing countries??? and least developed countries??? share of global merchandise exports (%)",
                "uri": "/v1/sdg/Series/TX_EXP_GBMRCH"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.11"
                ],
                "indicator": [
                    "17.11.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TX_EXP_GBSVR",
                "description": "Developing countries??? and least developed countries??? share of global services exports (%)",
                "uri": "/v1/sdg/Series/TX_EXP_GBSVR"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.11"
                ],
                "indicator": [
                    "17.11.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TX_IMP_GBSVR",
                "description": "Developing countries??? and least developed countries??? share of global services imports (%)",
                "uri": "/v1/sdg/Series/TX_IMP_GBSVR"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.12",
        "code": "17.12.1",
        "description": "Weighted average tariffs faced by developing countries, least developed countries and small island developing States",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.12.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.12"
                ],
                "indicator": [
                    "17.12.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TM_TAX_DMFN",
                "description": "Average tariff applied by developed countries, most-favored nation status, by type of product (%)",
                "uri": "/v1/sdg/Series/TM_TAX_DMFN"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.12"
                ],
                "indicator": [
                    "17.12.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TM_TAX_DPRF",
                "description": "Average tariff applied by developed countries, preferential status, by type of product (%)",
                "uri": "/v1/sdg/Series/TM_TAX_DPRF"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.13",
        "code": "17.13.1",
        "description": "Macroeconomic Dashboard",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.13.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FB_BNK_CAPA_ZS",
                "description": "Bank capital to assets ratio (%)",
                "uri": "/v1/sdg/Series/FB_BNK_CAPA_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FM_LBL_BMNY_ZG",
                "description": "Annual broad money growth (%)",
                "uri": "/v1/sdg/Series/FM_LBL_BMNY_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FM_LBL_BMNY_IR_ZS",
                "description": "Broad money to total reserves ratio",
                "uri": "/v1/sdg/Series/FM_LBL_BMNY_IR_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GC_BAL_CASH_GD_ZS",
                "description": "Cash surplus/deficit as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/GC_BAL_CASH_GD_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "BN_CAB_XOKA_GD_ZS",
                "description": "Current account balance as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/BN_CAB_XOKA_GD_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "PA_NUS_ATLS",
                "description": "DEC alternative conversion factor (in local currency unit per United States dollar)",
                "uri": "/v1/sdg/Series/PA_NUS_ATLS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NE_EXP_GNFS_KD_ZG",
                "description": "Annual growth of exports of goods and services (%)",
                "uri": "/v1/sdg/Series/NE_EXP_GNFS_KD_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DT_DOD_DECT_GN_ZS",
                "description": "External debt stocks as a proportion of GNI (%)",
                "uri": "/v1/sdg/Series/DT_DOD_DECT_GN_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "BX_KLT_DINV_WD_GD_ZS",
                "description": "Foreign direct investment, net inflows, as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/BX_KLT_DINV_WD_GD_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NY_GDP_MKTP_KD_ZG",
                "description": "Annual GDP growth (%)",
                "uri": "/v1/sdg/Series/NY_GDP_MKTP_KD_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NE_CON_GOVT_KD_ZG",
                "description": "Annual growth of the general government final consumption expenditure (%)",
                "uri": "/v1/sdg/Series/NE_CON_GOVT_KD_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NE_GDI_TOTL_KD_ZG",
                "description": "Annual growth of the gross capital formation (%)",
                "uri": "/v1/sdg/Series/NE_GDI_TOTL_KD_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NE_CON_PRVT_KD_ZG",
                "description": "Annual growth of households and NPISHs final consumption expenditure (%)",
                "uri": "/v1/sdg/Series/NE_CON_PRVT_KD_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "NE_IMP_GNFS_KD_ZG",
                "description": "Annual growth of imports of goods and services (%)",
                "uri": "/v1/sdg/Series/NE_IMP_GNFS_KD_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FP_CPI_TOTL_ZG",
                "description": "Annual inflation, consumer prices (%)",
                "uri": "/v1/sdg/Series/FP_CPI_TOTL_ZG"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "TG_VAL_TOTL_GD_ZS",
                "description": "Merchandise trade as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/TG_VAL_TOTL_GD_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "BN_KLT_PTXL_CD",
                "description": "Portfolio investment, net (Balance of Payments, current United States dollars)",
                "uri": "/v1/sdg/Series/BN_KLT_PTXL_CD"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GC_TAX_TOTL_GD_ZS",
                "description": "Tax revenue as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/GC_TAX_TOTL_GD_ZS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "FI_RES_TOTL_MO",
                "description": "Total reserves in months of imports (ratio)",
                "uri": "/v1/sdg/Series/FI_RES_TOTL_MO"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.13"
                ],
                "indicator": [
                    "17.13.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "DP_DOD_DLD2_CR_CG_Z1",
                "description": "Gross public sector debt, Central Government, as a proportion of GDP (%)",
                "uri": "/v1/sdg/Series/DP_DOD_DLD2_CR_CG_Z1"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.14",
        "code": "17.14.1",
        "description": "Number of countries with mechanisms in place to enhance policy coherence of sustainable development",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.14.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.14"
                ],
                "indicator": [
                    "17.14.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_CPA_SDEVP",
                "description": "Mechanisms in place to enhance policy coherence for sustainable development (%)",
                "uri": "/v1/sdg/Series/SG_CPA_SDEVP"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.15",
        "code": "17.15.1",
        "description": "Extent of use of country-owned results frameworks and planning tools by providers of development cooperation",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.15.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_PRVRIMON",
                "description": "Proportion of results indicators which will be monitored using government sources and monitoring systems - data by provider (%)",
                "uri": "/v1/sdg/Series/SG_PLN_PRVRIMON"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_RECRIMON",
                "description": "Proportion of results indicators which will be monitored using government sources and monitoring systems - data by recipient (%)",
                "uri": "/v1/sdg/Series/SG_PLN_RECRIMON"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_PRVNDI",
                "description": "Proportion of project objectives of new development interventions drawn from country-led result frameworks - data by provider (%)",
                "uri": "/v1/sdg/Series/SG_PLN_PRVNDI"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_RECNDI",
                "description": "Proportion of project objectives in new development interventions drawn from country-led result frameworks - data by recipient (%)",
                "uri": "/v1/sdg/Series/SG_PLN_RECNDI"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_PRVRICTRY",
                "description": "Proportion of results indicators drawn from country-led results frameworks - data by provider (%)",
                "uri": "/v1/sdg/Series/SG_PLN_PRVRICTRY"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_RECRICTRY",
                "description": "Proportion of results indicators drawn from country-led results frameworks - data by recipient (%)",
                "uri": "/v1/sdg/Series/SG_PLN_RECRICTRY"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_REPOLRES",
                "description": "Extent of use of country-owned results frameworks and planning tools by providers of development cooperation - data by recipient (%) ",
                "uri": "/v1/sdg/Series/SG_PLN_REPOLRES"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.15"
                ],
                "indicator": [
                    "17.15.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_PRPOLRES",
                "description": "Extent of use of country-owned results frameworks and planning tools by providers of development cooperation - data by provider (%) ",
                "uri": "/v1/sdg/Series/SG_PLN_PRPOLRES"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.16",
        "code": "17.16.1",
        "description": "Number of countries reporting progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.16.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.16"
                ],
                "indicator": [
                    "17.16.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_MSTKSDG_P",
                "description": "Number of countries reporting progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals, Provider (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_PLN_MSTKSDG_P"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.16"
                ],
                "indicator": [
                    "17.16.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_PLN_MSTKSDG_R",
                "description": "Number of countries reporting progress in multi-stakeholder development effectiveness monitoring frameworks that support the achievement of the sustainable development goals, Recipient (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_PLN_MSTKSDG_R"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.17",
        "code": "17.17.1",
        "description": "Amount in United States dollars committed to public-private partnerships for infrastructure",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.17.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.17"
                ],
                "indicator": [
                    "17.17.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GF_COM_PPPI",
                "description": "Amount of United States dollars committed to public-private partnerships for infrastructure, million USD nominal",
                "uri": "/v1/sdg/Series/GF_COM_PPPI"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.17"
                ],
                "indicator": [
                    "17.17.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "GF_COM_PPPI_KD",
                "description": "Amount of United States dollars committed to public-private partnerships for infrastructure, million USD real",
                "uri": "/v1/sdg/Series/GF_COM_PPPI_KD"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.18",
        "code": "17.18.2",
        "description": "Number of countries that have national statistical legislation that complies with the Fundamental Principles of Official Statistics",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.18.2",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.18"
                ],
                "indicator": [
                    "17.18.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_FPOS",
                "description": "Countries with national statistical legislation exists that complies with the Fundamental Principles of Official Statistics (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_STT_FPOS"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.18",
        "code": "17.18.3",
        "description": "Number of countries with a national statistical plan that is fully funded and under implementation, by source of funding",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.18.3",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.18"
                ],
                "indicator": [
                    "17.18.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_NSDSFDGVT",
                "description": "Countries with national statistical plans with funding from Government (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_STT_NSDSFDGVT"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.18"
                ],
                "indicator": [
                    "17.18.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_NSDSFDDNR",
                "description": "Countries with national statistical plans with funding from donors (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_STT_NSDSFDDNR"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.18"
                ],
                "indicator": [
                    "17.18.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_NSDSFDOTHR",
                "description": "Countries with national statistical plans with funding from others (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_STT_NSDSFDOTHR"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.18"
                ],
                "indicator": [
                    "17.18.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_NSDSIMPL",
                "description": "Countries with national statistical plans that are under implementation (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_STT_NSDSIMPL"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.18"
                ],
                "indicator": [
                    "17.18.3"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_NSDSFND",
                "description": "Countries with national statistical plans that are fully funded (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_STT_NSDSFND"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.18",
        "code": "17.18.1",
        "description": "Statistical capacity indicator for Sustainable Development Goal monitoring",
        "tier": "2",
        "uri": "/v1/sdg/Indicator/17.18.1",
        "series": []
    },
    {
        "goal": "17",
        "target": "17.19",
        "code": "17.19.1",
        "description": "Dollar value of all resources made available to strengthen statistical capacity in developing countries",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.19.1",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.1"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_STT_CAPTY",
                "description": "Dollar value of all resources made available to strengthen statistical capacity in developing countries (current United States dollars)",
                "uri": "/v1/sdg/Series/SG_STT_CAPTY"
            }
        ]
    },
    {
        "goal": "17",
        "target": "17.19",
        "code": "17.19.2",
        "description": "Proportion of countries that (a) have conducted at least one population and housing census in the last 10 years; and (b) have achieved 100 per cent birth registration and 80 per cent death registration",
        "tier": "1",
        "uri": "/v1/sdg/Indicator/17.19.2",
        "series": [
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_BRTH90",
                "description": "Proportion of countries with birth registration data that are at least 90 percent complete (%)",
                "uri": "/v1/sdg/Series/SG_REG_BRTH90"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_DETH75",
                "description": "Proportion of countries with death registration data that are at least 75 percent complete (%)",
                "uri": "/v1/sdg/Series/SG_REG_DETH75"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_CENSUS",
                "description": "Proportion of countries that have conducted at least one population and housing census in the last 10 years (%)",
                "uri": "/v1/sdg/Series/SG_REG_CENSUS"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_CENSUSN",
                "description": "Countries that have conducted at least one population and housing census in the last 10 years (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_REG_CENSUSN"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_BRTH90N",
                "description": "Countries with birth registration data that are at least 90 percent complete (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_REG_BRTH90N"
            },
            {
                "goal": [
                    "17"
                ],
                "target": [
                    "17.19"
                ],
                "indicator": [
                    "17.19.2"
                ],
                "release": "2022.Q3.G.03",
                "code": "SG_REG_DETH75N",
                "description": "Countries with death registration data that are at least 75 percent complete (1 = YES; 0 = NO)",
                "uri": "/v1/sdg/Series/SG_REG_DETH75N"
            }
        ]
    }
]


