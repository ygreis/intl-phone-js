/**
 * @see https://github.com/ChristoPy/countries-phone-masks/tree/main
 */

export interface CountryPhone {
    name: string,
    code: string,
    iso: string,
    mask: string | string[],
}

const countries: CountryPhone[] = [
    {
      "name": "Afghanistan",
      "code": "+93",
      "iso": "AF",
      "mask": "##-###-####"
    },
    {
      "name": "Aland Islands",
      "code": "+358",
      "iso": "AX",
      "mask": "(###)###-##-##"
    },
    {
      "name": "Albania",
      "code": "+355",
      "iso": "AL",
      "mask": "(###)###-###"
    },
    {
      "name": "Algeria",
      "code": "+213",
      "iso": "DZ",
      "mask": "##-###-####"
    },
    {
      "name": "American Samoa",
      "code": "+1",
      "iso": "AS",
      "mask": "(684)###-####"
    },
    {
      "name": "Andorra",
      "code": "+376",
      "iso": "AD",
      "mask": "###-###"
    },
    {
      "name": "Angola",
      "code": "+244",
      "iso": "AO",
      "mask": "(###)###-###"
    },
    {
      "name": "Anguilla",
      "code": "+1",
      "iso": "AI",
      "mask": "(264)###-####"
    },
    {
      "name": "Antarctica",
      "code": "+672",
      "iso": "AQ",
      "mask": "1##-###"
    },
    {
      "name": "Antigua and Barbuda",
      "code": "+1",
      "iso": "AG",
      "mask": "(268)###-####"
    },
    {
      "name": "Argentina",
      "code": "+54",
      "iso": "AR",
      "mask": "(###)###-####"
    },
    {
      "name": "Armenia",
      "code": "+374",
      "iso": "AM",
      "mask": "##-###-###"
    },
    {
      "name": "Aruba",
      "code": "+297",
      "iso": "AW",
      "mask": "###-####"
    },
    {
      "name": "Ascension Island",
      "code": "+247",
      "iso": "AC",
      "mask": "####"
    },
    {
      "name": "Australia",
      "code": "+61",
      "iso": "AU",
      "mask": "#-####-####"
    },
    {
      "name": "Austria",
      "code": "+43",
      "iso": "AT",
      "mask": "(###)###-####"
    },
    {
      "name": "Azerbaijan",
      "code": "+994",
      "iso": "AZ",
      "mask": "##-###-##-##"
    },
    {
      "name": "Bahamas",
      "code": "+1",
      "iso": "BS",
      "mask": "(242)###-####"
    },
    {
      "name": "Bahrain",
      "code": "+973",
      "iso": "BH",
      "mask": "####-####"
    },
    {
      "name": "Bangladesh",
      "code": "+880",
      "iso": "BD",
      "mask": "1###-######"
    },
    {
      "name": "Barbados",
      "code": "+1",
      "iso": "BB",
      "mask": "(246)###-####"
    },
    {
      "name": "Belarus",
      "code": "+375",
      "iso": "BY",
      "mask": "(##)###-##-##"
    },
    {
      "name": "Belgium",
      "code": "+32",
      "iso": "BE",
      "mask": "(###)###-###"
    },
    {
      "name": "Belize",
      "code": "+501",
      "iso": "BZ",
      "mask": "###-####"
    },
    {
      "name": "Benin",
      "code": "+229",
      "iso": "BJ",
      "mask": "##-##-####"
    },
    {
      "name": "Bermuda",
      "code": "+1",
      "iso": "BM",
      "mask": "(441)###-####"
    },
    {
      "name": "Bhutan",
      "code": "+975",
      "iso": "BT",
      "mask": [
        "17-###-###",
        "77-###-###",
        "#-###-###"
      ]
    },
    {
      "name": "Bolivia",
      "code": "+591",
      "iso": "BO",
      "mask": "#-###-####"
    },
    {
      "name": "Bosnia and Herzegovina",
      "code": "+387",
      "iso": "BA",
      "mask": [
        "##-####",
        "##-#####"
      ]
    },
    {
      "name": "Botswana",
      "code": "+267",
      "iso": "BW",
      "mask": "##-###-###"
    },
    {
      "name": "Brazil",
      "code": "+55",
      "iso": "BR",
      "mask": [
        "(##)####-####",
        "(##)#####-####"
      ]
    },
    {
      "name": "British Indian Ocean Territory",
      "code": "+246",
      "iso": "IO",
      "mask": "###-####"
    },
    {
      "name": "Brunei Darussalam",
      "code": "+673",
      "iso": "BN",
      "mask": "###-####"
    },
    {
      "name": "Bulgaria",
      "code": "+359",
      "iso": "BG",
      "mask": "(###)###-###"
    },
    {
      "name": "Burkina Faso",
      "code": "+226",
      "iso": "BF",
      "mask": "##-##-####"
    },
    {
      "name": "Burundi",
      "code": "+257",
      "iso": "BI",
      "mask": "##-##-####"
    },
    {
      "name": "Cambodia",
      "code": "+855",
      "iso": "KH",
      "mask": "##-###-###"
    },
    {
      "name": "Cameroon",
      "code": "+237",
      "iso": "CM",
      "mask": "####-####"
    },
    {
      "name": "Canada",
      "code": "+1",
      "iso": "CA",
      "mask": "(###)###-####"
    },
    {
      "name": "Cape Verde",
      "code": "+238",
      "iso": "CV",
      "mask": "(###)##-##"
    },
    {
      "name": "Cayman Islands",
      "code": "+1",
      "iso": "KY",
      "mask": "(345)###-####"
    },
    {
      "name": "Central African Republic",
      "code": "+236",
      "iso": "CF",
      "mask": "##-##-####"
    },
    {
      "name": "Chad",
      "code": "+235",
      "iso": "TD",
      "mask": "##-##-##-##"
    },
    {
      "name": "Chile",
      "code": "+56",
      "iso": "CL",
      "mask": "#-####-####"
    },
    {
      "name": "China",
      "code": "+86",
      "iso": "CN",
      "mask": [
        "(###)####-###",
        "(###)####-####",
        "##-#####-#####"
      ]
    },
    {
      "name": "Christmas Island",
      "code": "+61",
      "iso": "CX",
      "mask": "#-####-####"
    },
    {
      "name": "Cocos (Keeling) Islands",
      "code": "+61",
      "iso": "CC",
      "mask": "#-####-####"
    },
    {
      "name": "Colombia",
      "code": "+57",
      "iso": "CO",
      "mask": "(###)###-####"
    },
    {
      "name": "Comoros",
      "code": "+269",
      "iso": "KM",
      "mask": "##-#####"
    },
    {
      "name": "Congo",
      "code": "+242",
      "iso": "CG",
      "mask": "##-#####"
    },
    {
      "name": "Cook Islands",
      "code": "+682",
      "iso": "CK",
      "mask": "##-###"
    },
    {
      "name": "Costa Rica",
      "code": "+506",
      "iso": "CR",
      "mask": "####-####"
    },
    {
      "name": "Croatia",
      "code": "+385",
      "iso": "HR",
      "mask": "##-###-###"
    },
    {
      "name": "Cuba",
      "code": "+53",
      "iso": "CU",
      "mask": "#-###-####"
    },
    {
      "name": "Cyprus",
      "code": "+357",
      "iso": "CY",
      "mask": "##-###-###"
    },
    {
      "name": "Czech Republic",
      "code": "+420",
      "iso": "CZ",
      "mask": "(###)###-###"
    },
    {
      "name": "Democratic Republic of the Congo",
      "code": "+243",
      "iso": "CD",
      "mask": "(###)###-###"
    },
    {
      "name": "Denmark",
      "code": "+45",
      "iso": "DK",
      "mask": "##-##-##-##"
    },
    {
      "name": "Djibouti",
      "code": "+253",
      "iso": "DJ",
      "mask": "##-##-##-##"
    },
    {
      "name": "Dominica",
      "code": "+1",
      "iso": "DM",
      "mask": "(767)###-####"
    },
    {
      "name": "Dominican Republic",
      "code": "+1",
      "iso": "DO",
      "mask": [
        "(809)###-####",
        "(829)###-####",
        "(849)###-####"
      ]
    },
    {
      "name": "Ecuador",
      "code": "+593",
      "iso": "EC",
      "mask": [
        "#-###-####",
        "##-###-####"
      ]
    },
    {
      "name": "Egypt",
      "code": "+20",
      "iso": "EG",
      "mask": "(###)###-####"
    },
    {
      "name": "El Salvador",
      "code": "+503",
      "iso": "SV",
      "mask": "##-##-####"
    },
    {
      "name": "Equatorial Guinea",
      "code": "+240",
      "iso": "GQ",
      "mask": "##-###-####"
    },
    {
      "name": "Eritrea",
      "code": "+291",
      "iso": "ER",
      "mask": "#-###-###"
    },
    {
      "name": "Estonia",
      "code": "+372",
      "iso": "EE",
      "mask": [
        "###-####",
        "####-####"
      ]
    },
    {
      "name": "Eswatini",
      "code": "+268",
      "iso": "SZ",
      "mask": "##-##-####"
    },
    {
      "name": "Ethiopia",
      "code": "+251",
      "iso": "ET",
      "mask": "##-###-####"
    },
    {
      "name": "Falkland Islands (Malvinas)",
      "code": "+500",
      "iso": "FK",
      "mask": "#####"
    },
    {
      "name": "Faroe Islands",
      "code": "+298",
      "iso": "FO",
      "mask": "## ## ##"
    },
    {
      "name": "Fiji",
      "code": "+679",
      "iso": "FJ",
      "mask": "##-#####"
    },
    {
      "name": "Finland",
      "code": "+358",
      "iso": "FI",
      "mask": "## ### ####"
    },
    {
      "name": "France",
      "code": "+33",
      "iso": "FR",
      "mask": "# ## ## ## ##"
    },
    {
      "name": "French Guiana",
      "code": "+594",
      "iso": "GF",
      "mask": "### ## ## ##"
    },
    {
      "name": "French Polynesia",
      "code": "+689",
      "iso": "PF",
      "mask": "## ## ## ##"
    },
    {
      "name": "Gabon",
      "code": "+241",
      "iso": "GA",
      "mask": "# ## ## ##"
    },
    {
      "name": "Gambia",
      "code": "+220",
      "iso": "GM",
      "mask": "### ####"
    },
    {
      "name": "Georgia",
      "code": "+995",
      "iso": "GE",
      "mask": "(###)###-###"
    },
    {
      "name": "Germany",
      "code": "+49",
      "iso": "DE",
      "mask": [
        "###-###",
        "(##) ####-####",
        "(###) ####-####",
        "(####) ###-####",
        "(3####) ##-####"
      ]
    },
    {
      "name": "Ghana",
      "code": "+233",
      "iso": "GH",
      "mask": "03# ### ####"
    },
    {
      "name": "Gibraltar",
      "code": "+350",
      "iso": "GI",
      "mask": "###-#####"
    },
    {
      "name": "Greece",
      "code": "+30",
      "iso": "GR",
      "mask": "(###)###-####"
    },
    {
      "name": "Greenland",
      "code": "+299",
      "iso": "GL",
      "mask": "##-##-##"
    },
    {
      "name": "Grenada",
      "code": "+1",
      "iso": "GD",
      "mask": "(473)###-####"
    },
    {
      "name": "Guadeloupe",
      "code": "+590",
      "iso": "GP",
      "mask": "### ## ## ##"
    },
    {
      "name": "Guam",
      "code": "+1",
      "iso": "GU",
      "mask": "671 ### ####"
    },
    {
      "name": "Guatemala",
      "code": "+502",
      "iso": "GT",
      "mask": "#-###-####"
    },
    {
      "name": "Guernsey",
      "code": "+44",
      "iso": "GG",
      "mask": "(####)######"
    },
    {
      "name": "Guinea",
      "code": "+224",
      "iso": "GN",
      "mask": "##-###-###"
    },
    {
      "name": "Guinea-Bissau",
      "code": "+245",
      "iso": "GW",
      "mask": "#-######"
    },
    {
      "name": "Guyana",
      "code": "+592",
      "iso": "GY",
      "mask": "###-####"
    },
    {
      "name": "Haiti",
      "code": "+509",
      "iso": "HT",
      "mask": "##-##-####"
    },
    {
      "name": "Holy See (Vatican City State)",
      "code": "+39",
      "iso": "VA",
      "mask": "06 698#####"
    },
    {
      "name": "Honduras",
      "code": "+504",
      "iso": "HN",
      "mask": "####-####"
    },
    {
      "name": "Hong Kong",
      "code": "+852",
      "iso": "HK",
      "mask": "####-####"
    },
    {
      "name": "Hungary",
      "code": "+36",
      "iso": "HU",
      "mask": "## ### ####"
    },
    {
      "name": "Iceland",
      "code": "+354",
      "iso": "IS",
      "mask": "###-####"
    },
    {
      "name": "India",
      "code": "+91",
      "iso": "IN",
      "mask": "(####)###-###"
    },
    {
      "name": "Indonesia",
      "code": "+62",
      "iso": "ID",
      "mask": [
        "##-###-##",
        "##-###-###",
        "##-###-####",
        "(8##)###-###",
        "(8##)###-##-###"
      ]
    },
    {
      "name": "Iran",
      "code": "+98",
      "iso": "IR",
      "mask": "(###)###-####"
    },
    {
      "name": "Iraq",
      "code": "+964",
      "iso": "IQ",
      "mask": "(###)###-####"
    },
    {
      "name": "Ireland",
      "code": "+353",
      "iso": "IE",
      "mask": "(###)###-###"
    },
    {
      "name": "Isle of Man",
      "code": "+44",
      "iso": "IM",
      "mask": "(####)######"
    },
    {
      "name": "Israel",
      "code": "+972",
      "iso": "IL",
      "mask": [
        "#-###-####",
        "5#-###-####"
      ]
    },
    {
      "name": "Italy",
      "code": "+39",
      "iso": "IT",
      "mask": "(###)####-###"
    },
    {
      "name": "Ivory Coast / Cote d'Ivoire",
      "code": "+225",
      "iso": "CI",
      "mask": "##-###-###"
    },
    {
      "name": "Jamaica",
      "code": "+1",
      "iso": "JM",
      "mask": "(876)###-####"
    },
    {
      "name": "Japan",
      "code": "+81",
      "iso": "JP",
      "mask": [
        "(###)###-###",
        "##-####-####"
      ]
    },
    {
      "name": "Jersey",
      "code": "+44",
      "iso": "JE",
      "mask": "(####)####-######"
    },
    {
      "name": "Jordan",
      "code": "+962",
      "iso": "JO",
      "mask": "#-####-####"
    },
    {
      "name": "Kazakhstan",
      "code": "+77",
      "iso": "KZ",
      "mask": [
        "(###) ### ## ##",
        "(####) ## ## ##",
        "(#####) # ## ##"
      ]
    },
    {
      "name": "Kenya",
      "code": "+254",
      "iso": "KE",
      "mask": "###-######"
    },
    {
      "name": "Kiribati",
      "code": "+686",
      "iso": "KI",
      "mask": "##-###"
    },
    {
      "name": "Korea, Democratic People's Republic of Korea",
      "code": "+850",
      "iso": "KP",
      "mask": [
        "###-###",
        "####-####",
        "##-###-###",
        "###-####-###",
        "191-###-####",
        "####-#############"
      ]
    },
    {
      "name": "Korea, Republic of South Korea",
      "code": "+82",
      "iso": "KR",
      "mask": "##-###-####"
    },
    {
      "name": "Kosovo",
      "code": "+383",
      "iso": "XK",
      "mask": [
        "##-###-###",
        "###-###-###"
      ]
    },
    {
      "name": "Kuwait",
      "code": "+965",
      "iso": "KW",
      "mask": "####-####"
    },
    {
      "name": "Kyrgyzstan",
      "code": "+996",
      "iso": "KG",
      "mask": "(###)###-###"
    },
    {
      "name": "Laos",
      "code": "+856",
      "iso": "LA",
      "mask": [
        "##-###-###",
        "(20##)###-###"
      ]
    },
    {
      "name": "Latvia",
      "code": "+371",
      "iso": "LV",
      "mask": "##-###-###"
    },
    {
      "name": "Lebanon",
      "code": "+961",
      "iso": "LB",
      "mask": [
        "#-###-###",
        "##-###-###"
      ]
    },
    {
      "name": "Lesotho",
      "code": "+266",
      "iso": "LS",
      "mask": "#-###-####"
    },
    {
      "name": "Liberia",
      "code": "+231",
      "iso": "LR",
      "mask": "##-###-###"
    },
    {
      "name": "Libya",
      "code": "+218",
      "iso": "LY",
      "mask": [
        "##-###-###",
        "21-###-####"
      ]
    },
    {
      "name": "Liechtenstein",
      "code": "+423",
      "iso": "LI",
      "mask": "(###)###-####"
    },
    {
      "name": "Lithuania",
      "code": "+370",
      "iso": "LT",
      "mask": "(###)##-###"
    },
    {
      "name": "Luxembourg",
      "code": "+352",
      "iso": "LU",
      "mask": "(###)###-###"
    },
    {
      "name": "Macau",
      "code": "+853",
      "iso": "MO",
      "mask": "####-####"
    },
    {
      "name": "Madagascar",
      "code": "+261",
      "iso": "MG",
      "mask": "##-##-#####"
    },
    {
      "name": "Malawi",
      "code": "+265",
      "iso": "MW",
      "mask": [
        "1-###-###",
        "#-####-####"
      ]
    },
    {
      "name": "Malaysia",
      "code": "+60",
      "iso": "MY",
      "mask": [
        "#-###-###",
        "##-###-###",
        "(###)###-###",
        "##-###-####"
      ]
    },
    {
      "name": "Maldives",
      "code": "+960",
      "iso": "MV",
      "mask": "###-####"
    },
    {
      "name": "Mali",
      "code": "+223",
      "iso": "ML",
      "mask": "##-##-####"
    },
    {
      "name": "Malta",
      "code": "+356",
      "iso": "MT",
      "mask": "####-####"
    },
    {
      "name": "Marshall Islands",
      "code": "+692",
      "iso": "MH",
      "mask": "###-####"
    },
    {
      "name": "Martinique",
      "code": "+596",
      "iso": "MQ",
      "mask": "(###)##-##-##"
    },
    {
      "name": "Mauritania",
      "code": "+222",
      "iso": "MR",
      "mask": "##-##-####"
    },
    {
      "name": "Mauritius",
      "code": "+230",
      "iso": "MU",
      "mask": "###-####"
    },
    {
      "name": "Mayotte",
      "code": "+262",
      "iso": "YT",
      "mask": "#####-####"
    },
    {
      "name": "Mexico",
      "code": "+52",
      "iso": "MX",
      "mask": [
        "##-##-####",
        "(###)###-####"
      ]
    },
    {
      "name": "Micronesia, Federated States of Micronesia",
      "code": "+691",
      "iso": "FM",
      "mask": "###-####"
    },
    {
      "name": "Moldova",
      "code": "+373",
      "iso": "MD",
      "mask": "####-####"
    },
    {
      "name": "Monaco",
      "code": "+377",
      "iso": "MC",
      "mask": [
        "##-###-###",
        "(###)###-###"
      ]
    },
    {
      "name": "Mongolia",
      "code": "+976",
      "iso": "MN",
      "mask": "##-##-####"
    },
    {
      "name": "Montenegro",
      "code": "+382",
      "iso": "ME",
      "mask": "##-###-###"
    },
    {
      "name": "Montserrat",
      "code": "+1",
      "iso": "MS",
      "mask": "(664)###-####"
    },
    {
      "name": "Morocco",
      "code": "+212",
      "iso": "MA",
      "mask": "##-####-###"
    },
    {
      "name": "Mozambique",
      "code": "+258",
      "iso": "MZ",
      "mask": "##-###-###"
    },
    {
      "name": "Myanmar",
      "code": "+95",
      "iso": "MM",
      "mask": [
        "###-###",
        "#-###-###",
        "##-###-###"
      ]
    },
    {
      "name": "Namibia",
      "code": "+264",
      "iso": "NA",
      "mask": "##-###-####"
    },
    {
      "name": "Nauru",
      "code": "+674",
      "iso": "NR",
      "mask": "###-####"
    },
    {
      "name": "Nepal",
      "code": "+977",
      "iso": "NP",
      "mask": "##-###-###"
    },
    {
      "name": "Netherlands",
      "code": "+31",
      "iso": "NL",
      "mask": "##-###-####"
    },
    {
      "name": "New Caledonia",
      "code": "+687",
      "iso": "NC",
      "mask": "##-####"
    },
    {
      "name": "New Zealand",
      "code": "+64",
      "iso": "NZ",
      "mask": [
        "#-###-###",
        "(###)###-###",
        "(###)###-####"
      ]
    },
    {
      "name": "Nicaragua",
      "code": "+505",
      "iso": "NI",
      "mask": "####-####"
    },
    {
      "name": "Niger",
      "code": "+227",
      "iso": "NE",
      "mask": "##-##-####"
    },
    {
      "name": "Nigeria",
      "code": "+234",
      "iso": "NG",
      "mask": [
        "##-###-##",
        "##-###-###",
        "(###)###-####"
      ]
    },
    {
      "name": "Niue",
      "code": "+683",
      "iso": "NU",
      "mask": "####"
    },
    {
      "name": "Norfolk Island",
      "code": "+672",
      "iso": "NF",
      "mask": "3##-###"
    },
    {
      "name": "North Macedonia",
      "code": "+389",
      "iso": "MK",
      "mask": "##-###-###"
    },
    {
      "name": "Northern Mariana Islands",
      "code": "+1",
      "iso": "MP",
      "mask": "(670)###-####"
    },
    {
      "name": "Norway",
      "code": "+47",
      "iso": "NO",
      "mask": "(###)##-###"
    },
    {
      "name": "Oman",
      "code": "+968",
      "iso": "OM",
      "mask": "##-###-###"
    },
    {
      "name": "Pakistan",
      "code": "+92",
      "iso": "PK",
      "mask": "(###)###-####"
    },
    {
      "name": "Palau",
      "code": "+680",
      "iso": "PW",
      "mask": "###-####"
    },
    {
      "name": "Palestine",
      "code": "+970",
      "iso": "PS",
      "mask": "##-###-####"
    },
    {
      "name": "Panama",
      "code": "+507",
      "iso": "PA",
      "mask": "###-####"
    },
    {
      "name": "Papua New Guinea",
      "code": "+675",
      "iso": "PG",
      "mask": "(###)##-###"
    },
    {
      "name": "Paraguay",
      "code": "+595",
      "iso": "PY",
      "mask": "(###)###-###"
    },
    {
      "name": "Peru",
      "code": "+51",
      "iso": "PE",
      "mask": "(###)###-###"
    },
    {
      "name": "Philippines",
      "code": "+63",
      "iso": "PH",
      "mask": "(###)###-####"
    },
    {
      "name": "Pitcairn",
      "code": "+870",
      "iso": "PN",
      "mask": "###-###-###"
    },
    {
      "name": "Poland",
      "code": "+48",
      "iso": "PL",
      "mask": "(###)###-###"
    },
    {
      "name": "Portugal",
      "code": "+351",
      "iso": "PT",
      "mask": "##-###-####"
    },
    {
      "name": "Puerto Rico",
      "code": "+1",
      "iso": "PR",
      "mask": [
        "(787) ### ####",
        "(939) ### ####"
      ]
    },
    {
      "name": "Qatar",
      "code": "+974",
      "iso": "QA",
      "mask": "####-####"
    },
    {
      "name": "Reunion",
      "code": "+262",
      "iso": "RE",
      "mask": "#####-####"
    },
    {
      "name": "Romania",
      "code": "+40",
      "iso": "RO",
      "mask": "##-###-####"
    },
    {
      "name": "Russia",
      "code": "+7",
      "iso": "RU",
      "mask": "(###)###-##-##"
    },
    {
      "name": "Rwanda",
      "code": "+250",
      "iso": "RW",
      "mask": "(###)###-###"
    },
    {
      "name": "Saint Barthelemy",
      "code": "+590",
      "iso": "BL",
      "mask": "###-##-##-##"
    },
    {
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "code": "+290",
      "iso": "SH",
      "mask": "####"
    },
    {
      "name": "Saint Kitts and Nevis",
      "code": "+1",
      "iso": "KN",
      "mask": "(869)###-####"
    },
    {
      "name": "Saint Lucia",
      "code": "+1",
      "iso": "LC",
      "mask": "(758)###-####"
    },
    {
      "name": "Saint Martin",
      "code": "+590",
      "iso": "MF",
      "mask": "(###)###-###"
    },
    {
      "name": "Saint Pierre and Miquelon",
      "code": "+508",
      "iso": "PM",
      "mask": "##-####"
    },
    {
      "name": "Saint Vincent and the Grenadines",
      "code": "+1",
      "iso": "VC",
      "mask": "(784)###-####"
    },
    {
      "name": "Samoa",
      "code": "+685",
      "iso": "WS",
      "mask": "##-####"
    },
    {
      "name": "San Marino",
      "code": "+378",
      "iso": "SM",
      "mask": "####-######"
    },
    {
      "name": "Sao Tome and Principe",
      "code": "+239",
      "iso": "ST",
      "mask": "##-#####"
    },
    {
      "name": "Saudi Arabia",
      "code": "+966",
      "iso": "SA",
      "mask": [
        "#-###-####",
        "5#-####-####"
      ]
    },
    {
      "name": "Senegal",
      "code": "+221",
      "iso": "SN",
      "mask": "##-###-####"
    },
    {
      "name": "Serbia",
      "code": "+381",
      "iso": "RS",
      "mask": "##-###-####"
    },
    {
      "name": "Seychelles",
      "code": "+248",
      "iso": "SC",
      "mask": "#-###-###"
    },
    {
      "name": "Sierra Leone",
      "code": "+232",
      "iso": "SL",
      "mask": "##-######"
    },
    {
      "name": "Singapore",
      "code": "+65",
      "iso": "SG",
      "mask": "####-####"
    },
    {
      "name": "Sint Maarten",
      "code": "+1",
      "iso": "SX",
      "mask": "(721)###-####"
    },
    {
      "name": "Slovakia",
      "code": "+421",
      "iso": "SK",
      "mask": "(###)###-###"
    },
    {
      "name": "Slovenia",
      "code": "+386",
      "iso": "SI",
      "mask": "##-###-###"
    },
    {
      "name": "Solomon Islands",
      "code": "+677",
      "iso": "SB",
      "mask": [
        "#####",
        "###-####"
      ]
    },
    {
      "name": "Somalia",
      "code": "+252",
      "iso": "SO",
      "mask": [
        "#-###-###",
        "##-###-###"
      ]
    },
    {
      "name": "South Africa",
      "code": "+27",
      "iso": "ZA",
      "mask": "##-###-####"
    },
    {
      "name": "South Georgia and the South Sandwich Islands",
      "code": "+500",
      "iso": "GS",
      "mask": "#####"
    },
    {
      "name": "South Sudan",
      "code": "+211",
      "iso": "SS",
      "mask": "##-###-####"
    },
    {
      "name": "Spain",
      "code": "+34",
      "iso": "ES",
      "mask": "(###)###-###"
    },
    {
      "name": "Sri Lanka",
      "code": "+94",
      "iso": "LK",
      "mask": "##-###-####"
    },
    {
      "name": "Sudan",
      "code": "+249",
      "iso": "SD",
      "mask": "##-###-####"
    },
    {
      "name": "Suriname",
      "code": "+597",
      "iso": "SR",
      "mask": [
        "###-###",
        "###-####"
      ]
    },
    {
      "name": "Svalbard and Jan Mayen",
      "code": "+47",
      "iso": "SJ",
      "mask": "(###)##-###"
    },
    {
      "name": "Sweden",
      "code": "+46",
      "iso": "SE",
      "mask": "##-###-####"
    },
    {
      "name": "Switzerland",
      "code": "+41",
      "iso": "CH",
      "mask": "##-###-####"
    },
    {
      "name": "Syrian Arab Republic",
      "code": "+963",
      "iso": "SY",
      "mask": "##-####-###"
    },
    {
      "name": "Taiwan",
      "code": "+886",
      "iso": "TW",
      "mask": [
        "####-####",
        "#-####-####"
      ]
    },
    {
      "name": "Tajikistan",
      "code": "+992",
      "iso": "TJ",
      "mask": "##-###-####"
    },
    {
      "name": "Tanzania, United Republic of Tanzania",
      "code": "+255",
      "iso": "TZ",
      "mask": "##-###-####"
    },
    {
      "name": "Thailand",
      "code": "+66",
      "iso": "TH",
      "mask": [
        "##-###-###",
        "##-###-####"
      ]
    },
    {
      "name": "Timor-Leste",
      "code": "+670",
      "iso": "TL",
      "mask": [
        "###-####",
        "77#-#####",
        "78#-#####"
      ]
    },
    {
      "name": "Togo",
      "code": "+228",
      "iso": "TG",
      "mask": "##-###-###"
    },
    {
      "name": "Tokelau",
      "code": "+690",
      "iso": "TK",
      "mask": "####"
    },
    {
      "name": "Tonga",
      "code": "+676",
      "iso": "TO",
      "mask": "#####"
    },
    {
      "name": "Trinidad and Tobago",
      "code": "+1",
      "iso": "TT",
      "mask": "(868)###-####"
    },
    {
      "name": "Tunisia",
      "code": "+216",
      "iso": "TN",
      "mask": "##-###-###"
    },
    {
      "name": "Turkey",
      "code": "+90",
      "iso": "TR",
      "mask": "(###)###-####"
    },
    {
      "name": "Turkmenistan",
      "code": "+993",
      "iso": "TM",
      "mask": "#-###-####"
    },
    {
      "name": "Turks and Caicos Islands",
      "code": "+1",
      "iso": "TC",
      "mask": "(249)###-###"
    },
    {
      "name": "Tuvalu",
      "code": "+688",
      "iso": "TV",
      "mask": [
        "2####",
        "90####"
      ]
    },
    {
      "name": "Uganda",
      "code": "+256",
      "iso": "UG",
      "mask": "(###)###-###"
    },
    {
      "name": "Ukraine",
      "code": "+380",
      "iso": "UA",
      "mask": "(##)###-##-##"
    },
    {
      "name": "United Arab Emirates",
      "code": "+971",
      "iso": "AE",
      "mask": [
        "#-###-####",
        "5#-###-####"
      ]
    },
    {
      "name": "United Kingdom",
      "code": "+44",
      "iso": "GB",
      "mask": "##-####-####"
    },
    {
      "name": "United States",
      "code": "+1",
      "iso": "US",
      "mask": "(###)###-####"
    },
    {
      "name": "Uruguay",
      "code": "+598",
      "iso": "UY",
      "mask": "#-###-##-##"
    },
    {
      "name": "Uzbekistan",
      "code": "+998",
      "iso": "UZ",
      "mask": "##-###-####"
    },
    {
      "name": "Vanuatu",
      "code": "+678",
      "iso": "VU",
      "mask": [
        "#####",
        "##-#####"
      ]
    },
    {
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "code": "+58",
      "iso": "VE",
      "mask": "(###)###-####"
    },
    {
      "name": "Vietnam",
      "code": "+84",
      "iso": "VN",
      "mask": [
        "##-####-###",
        "(###)####-###"
      ]
    },
    {
      "name": "Virgin Islands, British",
      "code": "+1",
      "iso": "VG",
      "mask": "(284)###-####"
    },
    {
      "name": "Virgin Islands, U.S.",
      "code": "+1",
      "iso": "VI",
      "mask": "(340)###-####"
    },
    {
      "name": "Wallis and Futuna",
      "code": "+681",
      "iso": "WF",
      "mask": "##-####"
    },
    {
      "name": "Yemen",
      "code": "+967",
      "iso": "YE",
      "mask": [
        "#-###-###",
        "##-###-###",
        "###-###-###"
      ]
    },
    {
      "name": "Zambia",
      "code": "+260",
      "iso": "ZM",
      "mask": "##-###-####"
    },
    {
      "name": "Zimbabwe",
      "code": "+263",
      "iso": "ZW",
      "mask": "#-######"
    }
  ]

  export default countries