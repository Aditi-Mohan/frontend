import React, { useState, useEffect } from 'react';
import '../css/subscription.css';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ToggleButton from 'react-toggle-button';

function AutoComplete() {

  const [verified, setVerified] = useState(false);
  const [watchList, setWatchList] = useState([]);
  const  [codePopup, setCodePopup] = useState(false);
  var newCountry = '';
  const [verificationCode, setCode] = useState('')
  const [error, setError] = useState(false);
  const [top5, setTop5] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log(verified, watchList);
  },[verified, watchList, verificationCode])
    
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
    { id : 48, name : 'Colombia'},
    { id : 49, name : 'Comoros'},
    { id : 50, name : 'Congo'},
    { id : 52, name : 'Democratic Republic Of Congo'},
    { id : 53, name : 'Cook Islands'},
    { id : 54, name : 'Costa Rica'},
    { id : 55, name : 'Côte D\'Ivoire'},
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
    { id : 98, name : 'Guyana'},
    { id : 99, name : 'Haiti'},
    { id : 100, name : 'Heard Island'},
    { id : 101, name : 'Mcdonald Islands'},
    { id : 102, name : 'Heard Island And Mcdonald Islands'},
    { id : 103, name : 'Holy See'},
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

  const handleOnSearch = (string, cached) => {
    console.log(string, cached);
  }

  const handleOnSelect = item => {
    console.log(item.name);
    newCountry = item.name;
  }

  const verfiyEmail = (e) => {
    var email = document.getElementById('email').value;
    console.log(email);
    fetch('email_verification/'+email).then(
      async (res)  => await res.json()).then(
        res => setCode(res.code)).then(
          res => {setCodePopup(true); setEmail(email)});
  }

  const checkCode = (e) => {
    console.log(verificationCode);
    var match = document.getElementById('verification-code').value == verificationCode;
    console.log(match);
    if(match) {
      setCodePopup(false);
      setVerified(true);
    }
    else {
      setError(true);
    }
  }

  const errorMessage = () => {
    return(
      <div style={{ zIndex: 90, width: window.innerWidth, height: window.innerHeight, position: "fixed", top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center'}}>
      <div style={{ margin: 'auto', padding: '5%', backgroundColor: 'white', borderRadius: '20px'}}>
        <h5 style={{color: '#fc6158', fontWeight: '700'}}>Code did not match try again or Change email address</h5>
        <button onClick={() => {setError(false)}} style={{marginLeft: '50%', backgroundColor: '#fc6158', }}>OK</button>
      </div>
    </div>
    )
  }

  const showPopup = () => {
    return(
      <div style={{ zIndex: 90, width: window.innerWidth, height: window.innerHeight, position: "fixed", top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center'}}>
        <div style={{ margin: 'auto', padding: '5%', backgroundColor: 'white', borderRadius: '20px'}}>
          <input id='verification-code' placeholder='Enter Code'/>
          <button onClick={checkCode}>Submit</button>
          <button onClick={() => setCodePopup(false)} style={{marginLeft: '50%', backgroundColor: '#eeeeee', color: 'black'}}>Cancel</button>
        </div>
      </div>
    )
  }

  const addToWatchList = (e) => {
    setWatchList([...watchList, newCountry]);
  }

  const getuid = async () => {
    var result;
    await fetch("api/subscriber/").then(async res => await res.json()).then(res => result=res)
    return result;
  }

  const subscribe = async (e) => {
    function getRndInteger() {
      return Math.floor(Math.random() * (1000000 - 0 + 1) ) + 0;
    }

    function processWatchlist(arr) {
      var str = ''
      for (var i=0; i<arr.length-1; i++ ) {
        str += arr[i] + '%'
      }
      str += arr[arr.length-1];
      return str;
    }

    fetch("api/subscriber/", { 
    // Adding method type 
    method: "POST", 
    // Adding body or contents to send 
    body: JSON.stringify({ 
      uid: getRndInteger(),
      email: email,
      watchlist: processWatchlist(watchList),
      top5: top5
    }), 
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json;"
    } 
    }).then(response => response.json()).then(json => console.log(json)); // Displaying results to console 

  }

  return (
    <div>
      <div className='email-field'>
        <label><h6>Email:</h6></label>
        <div style={{width: '20px'}}></div>
        <input id='email' type='email' placeholder='Enter your Email ID'/>
        <div style={{width: '20px'}}></div>
        <button onClick={verfiyEmail}>Verify Email</button>
      </div>
      <div style={{padding: '20px', display: 'flex'}}>
        <div style={{margin: 'auto', padding: '20px',}}>
      <h5>Add Countries to WatchList</h5>
      <div style={{display: 'flex'}}>
        <div style={{width: window.innerWidth/3}}>
            <ReactSearchAutocomplete
                placeholder='Search for Countries'
                items={countries}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                />
        </div>
        <button disabled={!verified} onClick={addToWatchList} style={{marginLeft: '10px', marginTop: '10px' , textAlign: 'center'}}>Add To WatchList</button>
        </div>
        </div>
        <div style={{margin: 'auto', width: window.innerWidth/3}}>
        <div style={{display: 'flex', marginLeft: '2%'}}>
        <ToggleButton inactiveLabel={'NO'} activeLabel={'YES'} value={top5}
          onToggle={(value) => {
            setTop5(!value);
          }} />
          <h5 style={{marginLeft: '20px', marginBottom: '15px',}}>Recive Top5</h5>
      </div>
          <div className='watchlist-header'>Your Watchlist</div>
          <div>
            {watchList.length === 0 ?
            <div className='watchlist-item' style={{color: '#757679'}}>Your Watchlist in Empty</div>
            : watchList.map((item) => {
              return(
                <div className='watchlist-item'>
                  {item}
                </div>
              )
            })}
          </div>
        </div>
        </div>
        <button disabled={!verified} onClick={subscribe}
          style={{ marginTop: '10%', marginLeft: '40%', 
          marginBottom: '20px' , width: '200px', height: '30px', 
          backgroundColor: '#fae19b', color: '#242526', 
          fontSize: '26px'}}>SUBSCRIBE</button>
        {codePopup && showPopup()}
        {error && errorMessage()}
    </div>
  );
}
export default AutoComplete;