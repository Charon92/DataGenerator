import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv;

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

// Load word files
const nouns = JSON.parse( fs.readFileSync( './files/english_nouns.json' ).toString() );
const verbs = JSON.parse( fs.readFileSync( './files/infinitiv-verbs-list.json' ).toString() );
const words = nouns.concat( verbs );

// Load region data
const DMY = [
    'UK', 'NL', 'DE', 'FR', 'IT', 'UA', 'RO', 'SW', 'NO', 'DZ', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BH', 'BD', 'BB', 'BY',
    'BE', 'BA', 'BO', 'BR', 'BG', 'CO', 'CR', 'HR', 'CY', 'CZ', 'DK', 'DM', 'DO', 'EC', 'EG', 'SV', 'EE', 'FL', 'GE',
    'GR', 'GL', 'GD', 'GT', 'GY', 'HN', 'IS', 'IN', 'ID', 'IQ', 'IE', 'IL', 'IT', 'JM', 'JO', 'KZ', 'KE', 'KW', 'KG',
    'LV', 'LB', 'LY', 'LU', 'MK', 'MY', 'MT', 'MX', 'ME', 'MA', 'NZ', 'NI', 'OM', 'PK', 'PA', 'PY', 'PE', 'PH', 'PL',
    'PT', 'QA', 'RU', 'KN', 'LC', 'VC', 'SA', 'RS', 'SG', 'SK', 'SI', 'ES', 'LK', 'SD', 'SR', 'CH', 'SY', 'TJ', 'TH',
    'TT', 'TN', 'TR', 'TM', 'AE', 'UY', 'UZ', 'VE', 'VN', 'YE'
];
const YMD = [ 'CN', 'JP', 'KR', 'TW', 'HU', 'MN', 'LT', 'BT', 'ES-PV', 'HK', 'IR', 'LT', 'MO', 'MM', 'NP', 'ZA', 'SE' ];
const MDY = [ 'US', 'BZ', 'CA', 'CL', 'FM', 'PW' ];
const regions = [ 'US', 'UK', 'NL' ];
const worldTownsCountysCountrys = JSON.parse( fs.readFileSync( './files/world_cities.json' ).toString() );
const usCityStates = JSON.parse( fs.readFileSync( './files/us_cities_and_states.json' ).toString() );
const ukTownsCountysCountrys = JSON.parse( fs.readFileSync( './files/uk_towns.json' ).toString() );

// Generate name
const firstNames = JSON.parse( fs.readFileSync( './files/firstnames.json' ).toString() );
const surnames = JSON.parse( fs.readFileSync( './files/surnames.json' ).toString());

// Generate date of birth
function generateDateOfBirth( region='US' ) {
    let dob;
    let month, day;
    const today = new Date();
    const year = between( 1899, today.getFullYear() )

    if( year === today.getFullYear() ) {
        month = between( 1, today.getMonth() )
    } else {
        month = between(1, 12)
    }

    if( month === today.getMonth() ) {
        day = between(1, today.getDay() )
    } else {
        day = between(1, 31)
    }

    if ( region in MDY ) {
        dob = `${month}-${day}-${year}`;
    } else if ( region in YMD ) {
        dob = `${year}-${month}-${day}`;
    } else {
        dob = `${day}-${month}-${year}`;
    }

    return [dob, day, month, year]
}

// Generate email address
const emailProviders = ['gmail.com', 'outlook.com', 'yahoo.com', 'netease.com', 'qq.com'];

function generateEmailFromName( firstName, lastName, year ) {
    const useDate = between(0, 2) === 1;
     if( useDate ) {
         return `${firstName.slice(0, between(2, firstName.length))}${lastName.slice(0, between(2, lastName.length))}${year}@${emailProviders[between(0, emailProviders.length)]}`
     } else {
         return `${firstName.slice(0, between(2, firstName.length))}${lastName.slice(0, between(2, lastName.length))}@${emailProviders[between(0, emailProviders.length)]}`
     }
}

// Generate passwords
function generatePassword() {
    const seed = Math.round( Math.random() );

    if ( seed === 0 ) {
        // L33t1fy!
        const symbols = ['!', '£', '$', '%', '^', '&', '*', '(', ')'];
        let pass = `${words[Math.floor(Math.random() * words.length)]}${words[Math.floor(Math.random() * words.length)]}`;
        pass = pass.replace( 'e', '3' );
        pass = pass.replace( 'a', '4' );
        pass = pass.replace( 'i', '!' );
        pass = pass.replace( 'l', '1' );
        pass = pass.replace( 'o', '0' );
        pass = pass + symbols[between(0, symbols.length)];
        return pass;
    }
    return `${words[Math.floor(Math.random() * words.length)]}${words[Math.floor(Math.random() * words.length)]}${words[Math.floor(Math.random() * words.length)]}${between(10000, 99999)}`
}

// Generate address
function generateAddress( region='US' ) {
    let street, city, state, country;
    const roadSuffixesEn = ['Road', 'Street', 'Avenue', 'Drive', 'Lane', 'Grove', 'Gardens', 'Crescent', 'Circus', 'Hill', 'Mews', 'Vale', 'Rise', 'Row', 'Mead', 'Wharf', 'Place', 'Court', 'Green', 'View']
    const roadSuffixesEnUs = ['Boulevard', 'Track'];
    const roadPrefixFr = ['Rue', 'Avenue', 'Place', 'Boulevard'];
    const roadSuffixDe = ['strasse', 'platz', 'weg', 'hof'];
    const roadSuffixNe = [ 'laan', 'straat', 'plaats', 'weg', 'rijbaan', 'singel', 'plantsoen', 'pad', 'beurs', 'dreef', 'singel', 'kade' ]
    const word = words[between(0, words.length)];

    if( region === 'US' ) {
        country = 'USA';
        const cityState = usCityStates[between(0, usCityStates.length)];
        city = cityState.city;
        state = cityState.state;
        street = `${between(0, 1000)} ${word.charAt(0).toUpperCase()}${word.slice(1)} ${roadSuffixesEnUs[between(0, roadSuffixesEnUs.length)]}`
    } else if( region === 'UK' ) {
        const townCountyCountry = ukTownsCountysCountrys[between(0, ukTownsCountysCountrys.length)]
        city = townCountyCountry.town;
        state = townCountyCountry.county;
        country = townCountyCountry.country;
        street = `${between(0, 1000)} ${word.charAt(0).toUpperCase()}${word.slice(1)} ${roadSuffixesEn[between(0, roadSuffixesEn.length)]}`
    } else {
        let roadSuffix;
        const townCountyCountry = worldTownsCountysCountrys[between(0, worldTownsCountysCountrys.length)]
        city = townCountyCountry.city;
        state = townCountyCountry.subcountry;
        country = townCountyCountry.country;

        if( country === 'Netherlands' ) {
            roadSuffix = roadSuffixNe[between(0, roadSuffixNe.length)];
            street = `${between(0, 1000)} ${word.charAt(0).toUpperCase()}${word.slice(1)} ${roadSuffix}`
        } else if( country === 'France' ) {
            roadSuffix = roadPrefixFr[between(0, roadPrefixFr.length)];
            street = `${roadSuffix} ${between(0, 1000)} ${word.charAt(0).toUpperCase()}${word.slice(1)}`
        } else if( country === 'Germany' ) {
            roadSuffix = roadSuffixDe[between(0, roadSuffixDe.length)];
            street = `${between(0, 1000)} ${word.charAt(0).toUpperCase()}${word.slice(1)}${roadSuffix}`
        } else {
            roadSuffix = roadSuffixesEn[between(0, roadSuffixesEn.length)];
            street = `${between(0, 1000)} ${word.charAt(0).toUpperCase()}${word.slice(1)} ${roadSuffix}`
        }
    }
    return [street, city, state, country];
}

function main( args ) {
    let amount = args.amount ? args.amount : 1;
    const startTime = new Date().getTime();

    for( let i = 0; i < amount; i++ ) {
        const firstname = firstNames[Math.floor(Math.random() * firstNames.length)];
        const surname = surnames[Math.floor(Math.random() * surnames.length)];
        const [street, city, state, country] = generateAddress( regions[between(0, regions.length)] );
        const password = generatePassword();
        const [dob, day, month, year] = generateDateOfBirth();
        const email = generateEmailFromName( firstname, surname, year );

        console.log( `${firstname} ${surname} (${dob}) - ${email}:${password} - ${street} ${city} ${state} ${country}` );
    }

    const endTime = new Date().getTime();
    console.log( `Took ${endTime - startTime} milliseconds to complete.` );
}

main( argv );