import React, { Component } from 'react';
import '../css/displayPanel.css';
import {ReactComponent as Tap} from '../svgs/icons/tap.svg';
import Charts from './Charts';

class DisplayPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            searchFunction: this.props.searchFunction,
            data: null,
        }
    }

    keyHandler = (element, e) => {

        String.prototype.toProperCase = function () {
            var str = this.trim();
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            if(this.indexOf("'") !== -1 && this.charAt(this.indexOf("'")+1) === 'i') {
                str = str.replace(str.charAt(str.indexOf("'")+1), str.charAt(str.indexOf("'")+1).toUpperCase())
            }
            return str;
        };

        var charCode;
    
        if(e && e.which){
            charCode = e.which;
        }else if(window.event){
            e = window.event;
            charCode = e.keyCode;
        }
    
        if(charCode == 13) {
            var country = isoCountries[e.target.value.toProperCase()];
            console.log(country);
            if(country !== undefined)
            this.state.searchFunction(country);
        }
    }

    componentDidUpdate(prevProps) {
        if( (prevProps.width !== this.props.width) || (prevProps.height !== this.props.height)) {
            this.setState({width: this.props.width, height: this.props.height});
        }
        if( this.props.country !== null ) {
            console.log(prevProps.country !== this.props.country);
            if( prevProps.country !== this.props.country ) {
                console.log("/api/data/"+this.props.country);
                fetch("/api/data/"+this.props.country).then(res => {
                    return res.json()
                }).then(data => {
                    console.log(data);
                    this.setState({data: data});
                }).catch(err => {
                    console.log(err);
                })
                }
    }
    }

    animate() {
        document.getElementById('search-box').placeholder = '';
        document.getElementById('input').style.boxShadow = "0 1px 10px 0 #fae19b"
    }

    revert() {
        document.getElementById('search-box').placeholder='Search';
        document.getElementById('input').style.boxShadow = '';
    }

    empty() {
        return(
            <div style={{display: 'block', textAlign: 'center', padding: '2%'}}>
                <span id='input' className='input'>
                <input id='search-box' className='search-box' type='text' 
                    onBlur={this.revert} onFocus={this.animate} onKeyDown={this.keyHandler} 
                    placeholder='Search'/>
                </span>
                <h5>or</h5>
                <h3>Select a Country to see Details </h3>
                <div style={{maxWidth: '200px', margin: 'auto'}}><Tap/></div>
            </div>
        );
    }

    display( loaded ) {
        return(
            <div>
            <div style={{display: 'flex'}}>
            <div id='display-div'>
        <table className='display-table'>
            <tbody>
                <tr>
                    <td>
                    <h4 style={{textAlign: 'center', float: 'top'}}>{this.props.country}</h4>
                    </td>
                </tr>
        <tr>
                <td>
                    <br/>
                    <label>
                        Rank: 
                    </label>
                    <br/><br/>
                </td>
                <td><br/><span> {loaded && this.state.data.rank} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Confirmed: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.currconfirmed} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Deaths: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.currdeath} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Recoveries: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.currrecovery} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        Total Active: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && this.state.data.curractive} </span><br/><br/></td>
            </tr>
            <tr>
                <td>
                    <label>
                        New Cases Today: 
                    </label>
                    <br/><br/>
                </td>
                <td><span> {loaded && 
                this.state.data.confirmed[this.state.data.confirmed.length-1]
                - this.state.data.confirmed[this.state.data.confirmed.length-2]
                } </span><br/><br/></td>
            </tr>
            </tbody>
        </table>
        </div>
        <Charts height={this.state.height*0.89} data={this.state.data} dates={this.props.dates}/>
    </div>
    </div>
        );
    }

    noData() {
        return(
            <div style={{display: 'block', textAlign: 'center', padding: '2%'}}>
                <h3 >No Details are Available</h3>
            </div>
        );
    }

    render() {
        return (
            <div id='displayPanel' style={{top: 80, right: 0, width: this.state.width, height: this.state.height+10}}>
                {this.props.country == null? this.empty() : this.state.data == null? this.display(false): this.state.data.country == null? this.noData() : this.display(true)}
            </div>
        )
    }
}

export default DisplayPanel;



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
    'Cocos Islands':   'CC',
    'Colombia':            'CO',    
    'Comoros':             'KM',    
    'Congo': 'CG',
    'Congo, Democratic Republic':'CD',
    'Democratic Republic Of Congo':'CD',
    'Cook Islands':        'CK',        
    'Costa Rica':          'CR',    
    'Cote D\'Ivoire':      'CI',   
    'Cote D\'ivoire':      'CI',     
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
    'Falkland Islands':   'FK',
    'Malvinas':   'FK',
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
    'Guinea Bissau':       'GW',   
    'Guyana':'GY',
    'Haiti': 'HT',
    'Heard Island':   'HM',
    'Mcdonald Islands':   'HM',
    'Heard Island And Mcdonald Islands':   'HM',
    'Holy See (Vatican CityState)': 'VA', 
    'Vatican CityState': 'VA', 
    'Vatican': 'VA', 
    'Honduras':            'HN',    
    'Hong Kong':           'HK',    
    'Hungary':             'HU',    
    'Iceland':             'IS',    
    'India': 'IN',
    'Indonesia':           'ID',    
    'Iran': 'IR',
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
    'Lao': 'LA',
    'Latvia':'LV',
    'Lebanon':             'LB',    
    'Lesotho':             'LS',    
    'Liberia':             'LR',    
    'Libyan Arab Jamahiriya':'LY',
    'Libyan':'LY',
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
    'Federated States Of Micronesia':   'FM',
    'Micronesia':   'FM',
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
    'Russia':  'RU',  
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
    'South Georgia':   'GS',
    'Sandwich Isl.':   'GS',
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
    'Turks':  'TC',
    'Caicos Islands':  'TC',
    'Tuvalu':'TV',
    'Uganda':'UG',
    'Ukraine':             'UA',    
    'United Arab Emirates':'AE',  
    'United Kingdom':      'GB',        
    'United States':       'US',        
    'United States Outlying Islands':'US',
    'Uruguay':             'UY',    
    'Uzbekistan':          'UZ',    
    'Vanuatu':             'VU',    
    'Venezuela':           'VE',    
    'Viet Nam':            'VN',    
    'Virgin Islands, British':   'VG',
    'Virgin Islands, US':'VI',  
    'Wallis And Futuna':   'WF',            
    'Western Sahara':      'EH',        
    'Yemen': 'YE',
    'Zambia':'ZM',
    'Zimbabwe': 'ZW',
};