import React, { Component } from 'react';
import '../css/displayPanel.css';
import {ReactComponent as Tap} from '../svgs/icons/tap.svg';
import Charts from './Charts';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

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

        toProperCase = function (string) {
            var str = string.trim();
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            if(this.indexOf("'") !== -1 && this.charAt(this.indexOf("'")+1) === 'i') {
                str = str.replace(str.charAt(str.indexOf("'")+1), str.charAt(str.indexOf("'")+1).toUpperCase())
            }
            return str;
        };

    // keyHandler = (element, e) => {

    //     String.prototype.toProperCase = function () {
    //         var str = this.trim();
    //         str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    //         if(this.indexOf("'") !== -1 && this.charAt(this.indexOf("'")+1) === 'i') {
    //             str = str.replace(str.charAt(str.indexOf("'")+1), str.charAt(str.indexOf("'")+1).toUpperCase())
    //         }
    //         return str;
    //     };

    //     var charCode;
    
    //     if(e && e.which){
    //         charCode = e.which;
    //     }else if(window.event){
    //         e = window.event;
    //         charCode = e.keyCode;
    //     }
    
    //     if(charCode == 13) {
    //         var country = isoCountries[e.target.value.toProperCase()];
    //         console.log(country);
    //         if(country !== undefined)
    //         this.state.searchFunction(country);
    //     }
    // }

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
    handleOnSearch = (string, cached) => {
        console.log(string, cached);
      }
    
    handleOnSelect = item => {
        console.log(item);
        var country = isoCountries[item.name];
        // console.log(item);
        // console.log(this.toProperCase(item));
        console.log(country);
        this.state.searchFunction(country);
      }
    
    animate = () => {
        document.getElementById('input-div').style.transform = 'scale(0.85)';
        setTimeout(() => {document.getElementById('input-div').style.transform = 'scale(0.8)';}, 300);
        // document.getElementById('input-div').style.boxShadow = "0 0px 8px 1px #fae19b";
    }

    empty() {
        return(
            <div style={{display: 'block', textAlign: 'center', padding: '2%'}}>
                <div id='input-div' 
                style ={{transition: 'all 300ms', transform: 'scale(0.8)', boxShadow: "0 0px 18px 1px #fae19b", 
                margin: 'auto', height: '61px', width: this.state.width -25, background: 'linear-gradient(21deg, #dadce1, #fae19b)', 
                padding: '3px', display: 'inline-block', borderRadius: '50px'}}>
                    <ReactSearchAutocomplete
                        placeholder='Search'
                        items={countries}
                        onFocus={this.animate}
                        onSearch={this.handleOnSearch}
                        onSelect={this.handleOnSelect}
                        styling={{borderRadius: '50px', hoverBackgroundColor:'#484a4d', backgroundColor: '#242526', lineColor: "rgb(0, 0, 0)", color: '#dadce1'}}/>
                </div>
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

var countries = [
    { id : 0, name : 'Afghanistan'},
    { id : 1, name : 'Aland Islands'},
    { id : 2, name : 'Albania'},
    { id : 3, name : 'Algeria'},
    { id : 4, name : 'American Samoa'},
    { id : 5, name : 'Andorra'},
    { id : 6, name : 'Angola'},
    { id : 7, name : 'Anguilla'},
    { id : 8, name : 'Antarctica'},
    { id : 9, name : 'Antigua And Barbuda'},
    { id : 10, name : 'Argentina'},
    { id : 11, name : 'Armenia'},
    { id : 12, name : 'Aruba'},
    { id : 13, name : 'Australia'},
    { id : 14, name : 'Austria'},
    { id : 15, name : 'Azerbaijan'},
    { id : 16, name : 'Bahamas'},
    { id : 17, name : 'Bahrain'},
    { id : 18, name : 'Bangladesh'},
    { id : 19, name : 'Barbados'},
    { id : 20, name : 'Belarus'},
    { id : 21, name : 'Belgium'},
    { id : 22, name : 'Belize'},
    { id : 23, name : 'Benin'},
    { id : 24, name : 'Bermuda'},
    { id : 25, name : 'Bhutan'},
    { id : 26, name : 'Bolivia'},
    { id : 27, name : 'Bosnia And Herzegovina'},
    { id : 28, name : 'Botswana'},
    { id : 29, name : 'Bouvet Island'},
    { id : 30, name : 'Brazil'},
    { id : 31, name : 'British Indian Ocean Territory'},
    { id : 32, name : 'Brunei Darussalam'},
    { id : 33, name : 'Bulgaria'},
    { id : 34, name : 'Burkina Faso'},
    { id : 35, name : 'Burundi'},
    { id : 36, name : 'Cambodia'},
    { id : 37, name : 'Cameroon'},
    { id : 38, name : 'Canada'},
    { id : 39, name : 'Cape Verde'},
    { id : 40, name : 'Cayman Islands'},
    { id : 41, name : 'Central African Republic'},
    { id : 42, name : 'Chad'},
    { id : 43, name : 'Chile'},
    { id : 44, name : 'China'},
    { id : 45, name : 'Christmas Island'},
    { id : 46, name : 'Cocos (Keeling) Islands'},
    { id : 47, name : 'Cocos Islands'},
    { id : 48, name : 'Colombia'},
    { id : 49, name : 'Comoros'},
    { id : 50, name : 'Congo'},
    { id : 51, name : 'Congo, Democratic Republic'},
    { id : 52, name : 'Democratic Republic Of Congo'},
    { id : 53, name : 'Cook Islands'},
    { id : 54, name : 'Costa Rica'},
    { id : 55, name : 'Cote D\'Ivoire'},
    { id : 56, name : 'Cote D\'ivoire'},
    { id : 57, name : 'Croatia'},
    { id : 58, name : 'Cuba'},
    { id : 59, name : 'Cyprus'},
    { id : 60, name : 'Czech Republic'},
    { id : 61, name : 'Denmark'},
    { id : 62, name : 'Djibouti'},
    { id : 63, name : 'Dominica'},
    { id : 64, name : 'Dominican Republic'},
    { id : 65, name : 'Ecuador'},
    { id : 66, name : 'Egypt'},
    { id : 67, name : 'El Salvador'},
    { id : 68, name : 'Equatorial Guinea'},
    { id : 69, name : 'Eritrea'},
    { id : 70, name : 'Estonia'},
    { id : 71, name : 'Ethiopia'},
    { id : 72, name : 'Falkland Islands (Malvinas)'},
    { id : 73, name : 'Falkland Islands'},
    { id : 74, name : 'Malvinas'},
    { id : 75, name : 'Faroe Islands'},
    { id : 76, name : 'Fiji'},
    { id : 77, name : 'Finland'},
    { id : 78, name : 'France'},
    { id : 79, name : 'French Guiana'},
    { id : 80, name : 'French Polynesia'},
    { id : 81, name : 'French Southern Territories'},
    { id : 82, name : 'Gabon'},
    { id : 83, name : 'Gambia'},
    { id : 84, name : 'Georgia'},
    { id : 85, name : 'Germany'},
    { id : 86, name : 'Ghana'},
    { id : 87, name : 'Gibraltar'},
    { id : 88, name : 'Greece'},
    { id : 89, name : 'Greenland'},
    { id : 90, name : 'Grenada'},
    { id : 91, name : 'Guadeloupe'},
    { id : 92, name : 'Guam'},
    { id : 93, name : 'Guatemala'},
    { id : 94, name : 'Guernsey'},
    { id : 95, name : 'Guinea'},
    { id : 96, name : 'Guinea-Bissau'},
    { id : 97, name : 'Guinea Bissau'},
    { id : 98, name : 'Guyana'},
    { id : 99, name : 'Haiti'},
    { id : 100, name : 'Heard Island'},
    { id : 101, name : 'Mcdonald Islands'},
    { id : 102, name : 'Heard Island And Mcdonald Islands'},
    { id : 103, name : 'Holy See (Vatican CityState)'},
    { id : 104, name : 'Vatican CityState'},
    { id : 105, name : 'Vatican'},
    { id : 106, name : 'Honduras'},
    { id : 107, name : 'Hong Kong'},
    { id : 108, name : 'Hungary'},
    { id : 109, name : 'Iceland'},
    { id : 110, name : 'India'},
    { id : 111, name : 'Indonesia'},
    { id : 112, name : 'Iran'},
    { id : 113, name : 'Iraq'},
    { id : 114, name : 'Ireland'},
    { id : 115, name : 'Isle Of Man'},
    { id : 116, name : 'Israel'},
    { id : 117, name : 'Italy'},
    { id : 118, name : 'Jamaica'},
    { id : 119, name : 'Japan'},
    { id : 120, name : 'Jersey'},
    { id : 121, name : 'Jordan'},
    { id : 122, name : 'Kazakhstan'},
    { id : 123, name : 'Kenya'},
    { id : 124, name : 'Kiribati'},
    { id : 125, name : 'Korea'},
    { id : 126, name : 'Kuwait'},
    { id : 127, name : 'Kyrgyzstan'},
    { id : 128, name : 'Lao People\'s Democratic Republic'},
    { id : 129, name : 'Lao'},
    { id : 130, name : 'Latvia'},
    { id : 131, name : 'Lebanon'},
    { id : 132, name : 'Lesotho'},
    { id : 133, name : 'Liberia'},
    { id : 134, name : 'Libyan Arab Jamahiriya'},
    { id : 135, name : 'Libyan'},
    { id : 136, name : 'Liechtenstein'},
    { id : 137, name : 'Lithuania'},
    { id : 138, name : 'Luxembourg'},
    { id : 139, name : 'Macao'},
    { id : 140, name : 'Macedonia'},
    { id : 141, name : 'Madagascar'},
    { id : 142, name : 'Malawi'},
    { id : 143, name : 'Malaysia'},
    { id : 144, name : 'Maldives'},
    { id : 145, name : 'Mali'},
    { id : 146, name : 'Malta'},
    { id : 147, name : 'Marshall Islands'},
    { id : 148, name : 'Martinique'},
    { id : 149, name : 'Mauritania'},
    { id : 150, name : 'Mauritius'},
    { id : 151, name : 'Mayotte'},
    { id : 152, name : 'Mexico'},
    { id : 153, name : 'Micronesia, Federated States Of'},
    { id : 154, name : 'Federated States Of Micronesia'},
    { id : 155, name : 'Micronesia'},
    { id : 156, name : 'Moldova'},
    { id : 157, name : 'Monaco'},
    { id : 158, name : 'Mongolia'},
    { id : 159, name : 'Montenegro'},
    { id : 160, name : 'Montserrat'},
    { id : 161, name : 'Morocco'},
    { id : 162, name : 'Mozambique'},
    { id : 163, name : 'Myanmar'},
    { id : 164, name : 'Namibia'},
    { id : 165, name : 'Nauru'},
    { id : 166, name : 'Nepal'},
    { id : 167, name : 'Netherlands'},
    { id : 168, name : 'Netherlands Antilles'},
    { id : 169, name : 'New Caledonia'},
    { id : 170, name : 'New Zealand'},
    { id : 171, name : 'Nicaragua'},
    { id : 172, name : 'Niger'},
    { id : 173, name : 'Nigeria'},
    { id : 174, name : 'Niue'},
    { id : 175, name : 'Norfolk Island'},
    { id : 176, name : 'Northern Mariana Islands'},
    { id : 177, name : 'Norway'},
    { id : 178, name : 'Oman'},
    { id : 179, name : 'Pakistan'},
    { id : 180, name : 'Palau'},
    { id : 181, name : 'Palestinian Territory, Occupied'},
    { id : 182, name : 'Panama'},
    { id : 183, name : 'Papua New Guinea'},
    { id : 184, name : 'Paraguay'},
    { id : 185, name : 'Peru'},
    { id : 186, name : 'Philippines'},
    { id : 187, name : 'Pitcairn'},
    { id : 188, name : 'Poland'},
    { id : 189, name : 'Portugal'},
    { id : 190, name : 'Puerto Rico'},
    { id : 191, name : 'Qatar'},
    { id : 192, name : 'Reunion'},
    { id : 193, name : 'Romania'},
    { id : 194, name : 'Russian Federation'},
    { id : 195, name : 'Russia'},
    { id : 196, name : 'Rwanda'},
    { id : 197, name : 'Saint Barthelemy'},
    { id : 198, name : 'Saint Helena'},
    { id : 199, name : 'Saint Kitts And Nevis'},
    { id : 200, name : 'Saint Lucia'},
    { id : 201, name : 'Saint Martin'},
    { id : 202, name : 'Saint Pierre And Miquelon'},
    { id : 203, name : 'Saint Vincent And Grenadines'},
    { id : 204, name : 'Samoa'},
    { id : 205, name : 'San Marino'},
    { id : 206, name : 'Sao Tome And Principe'},
    { id : 207, name : 'Saudi Arabia'},
    { id : 208, name : 'Senegal'},
    { id : 209, name : 'Serbia'},
    { id : 210, name : 'Seychelles'},
    { id : 211, name : 'Sierra Leone'},
    { id : 212, name : 'Singapore'},
    { id : 213, name : 'Slovakia'},
    { id : 214, name : 'Slovenia'},
    { id : 215, name : 'Solomon Islands'},
    { id : 216, name : 'Somalia'},
    { id : 217, name : 'South Africa'},
    { id : 218, name : 'South Georgia And Sandwich Isl.'},
    { id : 219, name : 'South Georgia'},
    { id : 220, name : 'Sandwich Isl.'},
    { id : 221, name : 'Spain'},
    { id : 222, name : 'Sri Lanka'},
    { id : 223, name : 'Sudan'},
    { id : 224, name : 'Suriname'},
    { id : 225, name : 'Svalbard And Jan Mayen'},
    { id : 226, name : 'Swaziland'},
    { id : 227, name : 'Sweden'},
    { id : 228, name : 'Switzerland'},
    { id : 229, name : 'Syrian Arab Republic'},
    { id : 230, name : 'Taiwan'},
    { id : 231, name : 'Tajikistan'},
    { id : 232, name : 'Tanzania'},
    { id : 233, name : 'Thailand'},
    { id : 234, name : 'Timor-Leste'},
    { id : 235, name : 'Togo'},
    { id : 236, name : 'Tokelau'},
    { id : 237, name : 'Tonga'},
    { id : 238, name : 'Trinidad And Tobago'},
    { id : 239, name : 'Tunisia'},
    { id : 240, name : 'Turkey'},
    { id : 241, name : 'Turkmenistan'},
    { id : 242, name : 'Turks And Caicos Islands'},
    { id : 243, name : 'Turks'},
    { id : 244, name : 'Caicos Islands'},
    { id : 245, name : 'Tuvalu'},
    { id : 246, name : 'Uganda'},
    { id : 247, name : 'Ukraine'},
    { id : 248, name : 'United Arab Emirates'},
    { id : 249, name : 'United Kingdom'},
    { id : 250, name : 'United States'},
    { id : 251, name : 'United States Outlying Islands'},
    { id : 252, name : 'Uruguay'},
    { id : 253, name : 'Uzbekistan'},
    { id : 254, name : 'Vanuatu'},
    { id : 255, name : 'Venezuela'},
    { id : 256, name : 'Viet Nam'},
    { id : 257, name : 'Virgin Islands, British'},
    { id : 258, name : 'Virgin Islands, US'},
    { id : 259, name : 'Wallis And Futuna'},
    { id : 300, name : 'Western Sahara'},
    { id : 301, name : 'Yemen'},
    { id : 302, name : 'Zambia'},
    { id : 303, name : 'Zimbabwe'},
  ];

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