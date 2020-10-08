import React, { Component } from 'react';
import '../css/Charts.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from '@amcharts/amcharts4/themes/dark';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

class Top5 extends Component {
    state = {}

    constructor() {
        super();
        this.state={
            clickHandler: () => {},
            currentIndex: 0,
            contryCodes: [],
            codes:isoCountries,
            data: [],
        }
        this.setCurr = this.setCurr.bind(this);
    }

    getCountryCode (countryName) {
        if (isoCountries.hasOwnProperty(countryName)) {
            return isoCountries[countryName];
        } else {
            return countryName;
        }
    }

    componentDidMount() {
        fetch('api/top5').then(res => res.json()).then(res => this.setState({data:res,})).then(res => {
            let countryCodes = this.state.data.map(item => this.getCountryCode(item.country));
            this.setState({countryCodes});
        }).then(res => this.makeChart()).then(res => {this.setState({clickHandler: res}); console.log(res)});
    }

    setCurr(newIndex) {
        this.setState({
            currentIndex: newIndex,
        })
    }

    makeChart() {
        let countryCodes = this.state.data.map(item => this.getCountryCode(item.country));

        let chart = am4core.create("chartdiv", am4maps.MapChart);

        try {
        chart.geodata = am4geodata_worldHigh;
        }
        catch (e) {
        chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
        }

        chart.projection = new am4maps.projections.Mercator();
        chart.padding(10, 20, 10, 20);
        chart.minZoomLevel = 0.9;
        chart.zoomLevel = 0.9;
        chart.maxZoomLevel = 1;

        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        // polygonSeries.include = countryCodes[0];
        polygonSeries.stroke = am4core.color("#ffffff")
        polygonSeries.fill = am4core.color("ffffff")


        let chart1 = am4core.create("hiddenchartdiv", am4maps.MapChart);
        chart1.padding(-100, -100, -100, -100);
        chart1.geodata = am4geodata_worldHigh;
        chart1.projection = new am4maps.projections.Mercator();


        let polygonSeries1 = chart1.series.push(new am4maps.MapPolygonSeries());
        polygonSeries1.useGeodata = true;
        // polygonSeries1.include = countryCodes[0];
        polygonSeries1.stroke = am4core.color("#ffffff")
        polygonSeries1.fill = am4core.color("ffffff")


        let label = chart.chartContainer.createChild(am4core.Label);
        label.x = 100;
        label.y = 100;
        label.fill = am4core.color("#ffffff");
        label.fontSize = 35;
        label.fontWeight = "bold";
        // label.text = this.state.data[0].country;
        label.fillOpacity = 0.5;

        let currentIndex = -1;
        let nextIndex = -1;
        let colorset = new am4core.ColorSet();

        setInterval(() => {
        changeCountry(nextIndex);
        this.setCurr(currentIndex);
        if(nextIndex == countryCodes.length-1) {
            nextIndex = 0;
        }
        else {
            nextIndex++;
        }
        }, 3000)

        function changeCountry(nextIndex) {
        let countryIndex = nextIndex;

        let morphToPolygon;

        if (currentIndex !== countryIndex) {
            polygonSeries1.data = [];
            polygonSeries1.include = [countryCodes[countryIndex]];

            currentIndex = countryIndex;

            polygonSeries1.events.once("validated", function () {

            morphToPolygon = polygonSeries1.mapPolygons.getIndex(0);
            if(morphToPolygon){
                let countryPolygon = polygonSeries.mapPolygons.getIndex(0);

                let morpher = countryPolygon.polygon.morpher;
                let morphAnimation = morpher.morphToPolygon(morphToPolygon.polygon.points);

                let colorAnimation = countryPolygon.animate({ "property": "fill", "to": colorset.getIndex(Math.round(Math.random() * 20)) }, 1000);

                let animation = label.animate({ property: "y", to: 500 }, 300);

                animation.events.once("animationended", function () {
                label.text = morphToPolygon.dataItem.dataContext["name"];
                label.y = -50;
                label.animate({ property: "y", to: 200 }, 300, am4core.ease.quadOut);
                })
            }
            })
        }
        }

        return changeCountry();
    }

    render() {
        return(
            <div style={{display: 'flex', width: '100%'}} className='top5-table'>
                <div style={{paddingLeft: '1%'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Country</th>
                        <th>Rank</th>
                        <th>Confirmed</th>
                        <th>Deaths</th>
                        <th>Active</th>
                        <th>Recoveries</th>
                        <th>New Cases</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((item, index)=> 
                        <tr key={index} style={{backgroundColor: this.state.countryCodes? this.state.countryCodes[index] === this.state.countryCodes[this.state.currentIndex]? "rgba(14, 147, 230, 0.4)": "": "", border: this.state.countryCodes? this.state.countryCodes[index] === this.state.countryCodes[this.state.currentIndex]? "1px solid #0e93e6":"":""}}>
                            <td>{item.country}</td>
                            <td>{item.rank}</td>
                            <td>{item.currconfirmed}</td>
                            <td>{item.currdeath}</td>
                            <td>{item.curractive}</td>
                            <td>{item.currrecovery}</td>
                            <td>{item.confirmed[item.confirmed.length-1]-item.confirmed[item.confirmed.length-2]}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
                <div id="chartdiv" style={{marginLeft: '10%', width: '90%', height: '500px'}}></div>
                {/* <div id="hiddenchartdiv" style={{marginLeft: '10%', width: '90%'}}></div> */}
            </div>
        )
    }
}

export default Top5;



var isoCountries = {
    'Afghanistan':'AF', 
    'Aland Islands':  'AX', 
    'Albania':'AL',
    'Algeria':'DZ',
    'American Samoa': 'AS',
    'Andorra':'AD',
    'Angola': 'AO',
    'Anguilla':   'AI',
    'Antarctica': 'AQ',
    'Antigua And Barbuda':'AG',
    'Argentina':  'AR',
    'Armenia':'AM',
    'Aruba':  'AW',
    'Australia':  'AU',
    'Austria':'AT',
    'Azerbaijan':          'AZ',    
    'Bahamas':             'BS',    
    'Bahrain':             'BH',    
    'Bangladesh':          'BD',    
    'Barbados':            'BB',    
    'Belarus':             'BY',    
    'Belgium':             'BE',    
    'Belize':'BZ',
    'Benin': 'BJ',
    'Bermuda':             'BM',    
    'Bhutan':'BT',
    'Bolivia':             'BO',    
    'Bosnia And Herzegovina':'BA',
    'Botswana':            'BW',    
    'Bouvet Island':       'BV',        
    'Brazil':'BR',
    'British Indian Ocean Territory':'IO',
    'Brunei Darussalam':   'BN',            
    'Bulgaria':            'BG',    
    'Burkina Faso':        'BF',        
    'Burundi':             'BI',    
    'Cambodia':            'KH',    
    'Cameroon':            'CM',    
    'Canada':'CA',
    'Cape Verde':          'CV',    
    'Cayman Islands':      'KY',        
    'Central African Republic':  'CF',
    'Chad':  'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island':    'CX',            
    'Cocos (Keeling) Islands':   'CC',
    'Colombia':            'CO',    
    'Comoros':             'KM',    
    'Congo': 'CG',
    'Congo, Democratic Republic':'CD',
    'Cook Islands':        'CK',        
    'Costa Rica':          'CR',    
    'Cote D\'Ivoire':      'CI',        
    'Croatia':             'HR',    
    'Cuba':  'CU',
    'Cyprus':'CY',
    'Czech Republic':      'CZ',        
    'Denmark':             'DK',    
    'Djibouti':            'DJ',    
    'Dominica':            'DM',    
    'Dominican Republic':  'DO',            
    'Ecuador':             'EC',    
    'Egypt': 'EG',
    'El Salvador':         'SV',        
    'Equatorial Guinea':   'GQ',            
    'Eritrea':             'ER',    
    'Estonia':             'EE',    
    'Ethiopia':            'ET',    
    'Falkland Islands (Malvinas)':   'FK',
    'Faroe Islands':       'FO',        
    'Fiji':  'FJ',
    'Finland':             'FI',    
    'France':'FR',
    'French Guiana':       'GF',        
    'French Polynesia':    'PF',            
    'French Southern Territories':   'TF',
    'Gabon': 'GA',
    'Gambia':'GM',
    'Georgia':             'GE',    
    'Germany':             'DE',    
    'Ghana': 'GH',
    'Gibraltar':           'GI',    
    'Greece':'GR',
    'Greenland':           'GL',    
    'Grenada':             'GD',    
    'Guadeloupe':          'GP',    
    'Guam':  'GU',
    'Guatemala':           'GT',    
    'Guernsey':            'GG',    
    'Guinea':'GN',
    'Guinea-Bissau':       'GW',        
    'Guyana':'GY',
    'Haiti': 'HT',
    'Heard Island & Mcdonald Islands':   'HM',
    'Holy See (Vatican CityState)': 'VA', 
    'Honduras':            'HN',    
    'Hong Kong':           'HK',    
    'Hungary':             'HU',    
    'Iceland':             'IS',    
    'India': 'IN',
    'Indonesia':           'ID',    
    'Iran, Islamic Republic Of': 'IR',
    'Iraq':  'IQ',
    'Ireland':             'IE',    
    'Isle Of Man':         'IM',        
    'Israel':'IL',
    'Italy': 'IT',
    'Jamaica':             'JM',    
    'Japan': 'JP',
    'Jersey':'JE',
    'Jordan':'JO',
    'Kazakhstan':          'KZ',    
    'Kenya': 'KE',
    'Kiribati':            'KI',    
    'Korea': 'KR',
    'Kuwait':'KW',
    'Kyrgyzstan':          'KG',    
    'Lao People\'s Democratic Republic': 'LA',
    'Latvia':'LV',
    'Lebanon':             'LB',    
    'Lesotho':             'LS',    
    'Liberia':             'LR',    
    'Libyan Arab Jamahiriya':'LY',
    'Liechtenstein':       'LI',        
    'Lithuania':           'LT',    
    'Luxembourg':          'LU',    
    'Macao': 'MO',
    'Macedonia':           'MK',    
    'Madagascar':          'MG',    
    'Malawi':'MW',
    'Malaysia':            'MY',    
    'Maldives':            'MV',    
    'Mali':  'ML',
    'Malta': 'MT',
    'Marshall Islands':    'MH',            
    'Martinique':          'MQ',    
    'Mauritania':          'MR',    
    'Mauritius':           'MU',    
    'Mayotte':             'YT',    
    'Mexico':'MX',
    'Micronesia, Federated States Of':   'FM',
    'Moldova':             'MD',    
    'Monaco':'MC',
    'Mongolia':            'MN',    
    'Montenegro':          'ME',    
    'Montserrat':          'MS',    
    'Morocco':             'MA',    
    'Mozambique':          'MZ',    
    'Myanmar':             'MM',    
    'Namibia':             'NA',    
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands':         'NL',        
    'Netherlands Antilles':'AN',  
    'New Caledonia':       'NC',        
    'New Zealand':         'NZ',        
    'Nicaragua':           'NI',    
    'Niger': 'NE',
    'Nigeria':             'NG',    
    'Niue':  'NU',
    'Norfolk Island':      'NF',        
    'Northern Mariana Islands':  'MP',
    'Norway':'NO',
    'Oman':  'OM',
    'Pakistan':            'PK',    
    'Palau': 'PW',
    'Palestinian Territory, Occupied':   'PS',
    'Panama':'PA',
    'Papua New Guinea':    'PG',            
    'Paraguay':            'PY',    
    'Peru':  'PE',
    'Philippines':         'PH',        
    'Pitcairn':            'PN',    
    'Poland':'PL',
    'Portugal':            'PT',    
    'Puerto Rico':         'PR',        
    'Qatar': 'QA',
    'Reunion':             'RE',    
    'Romania':             'RO',    
    'Russian Federation':  'RU',            
    'Rwanda':'RW',
    'Saint Barthelemy':    'BL',            
    'Saint Helena':        'SH',        
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia':         'LC',        
    'Saint Martin':        'MF',        
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines':  'VC',
    'Samoa': 'WS',
    'San Marino':          'SM',    
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia':        'SA',        
    'Senegal':             'SN',    
    'Serbia':'RS',
    'Seychelles':          'SC',    
    'Sierra Leone':        'SL',        
    'Singapore':           'SG',    
    'Slovakia':            'SK',    
    'Slovenia':            'SI',    
    'Solomon Islands':     'SB',            
    'Somalia':             'SO',    
    'South Africa':        'ZA',        
    'South Georgia And Sandwich Isl.':   'GS',
    'Spain': 'ES',
    'Sri Lanka':           'LK',    
    'Sudan': 'SD',
    'Suriname':            'SR',    
    'Svalbard And Jan Mayen':'SJ',
    'Swaziland':           'SZ',    
    'Sweden':'SE',
    'Switzerland':         'CH',        
    'Syrian Arab Republic':'SY',  
    'Taiwan':'TW',
    'Tajikistan':          'TJ',    
    'Tanzania':            'TZ',    
    'Thailand':            'TH',    
    'Timor-Leste':         'TL',        
    'Togo':  'TG',
    'Tokelau':             'TK',    
    'Tonga': 'TO',
    'Trinidad And Tobago': 'TT',  
    'Tunisia':             'TN',    
    'Turkey':'TR',
    'Turkmenistan':        'TM',        
    'Turks And Caicos Islands':  'TC',
    'Tuvalu':'TV',
    'Uganda':'UG',
    'Ukraine':             'UA',    
    'United Arab Emirates':'AE',  
    'United Kingdom':      'GB',        
    'United States':       'US',        
    'United States Outlying Islands':'UM',
    'Uruguay':             'UY',    
    'Uzbekistan':          'UZ',    
    'Vanuatu':             'VU',    
    'Venezuela':           'VE',    
    'Viet Nam':            'VN',    
    'Virgin Islands, British':   'VG',
    'Virgin Islands, U.S.':'VI',  
    'Wallis And Futuna':   'WF',            
    'Western Sahara':      'EH',        
    'Yemen': 'YE',
    'Zambia':'ZM',
    'Zimbabwe': 'ZW',
};