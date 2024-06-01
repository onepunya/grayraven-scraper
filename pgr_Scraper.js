const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://grayravens.com/wiki/GRAY_RAVENS';

async function getCharList() {
    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const characterDivs = $('.character_icon_div');

            const results = [];

            characterDivs.each((index, element) => {
                const characterUrl = 'https://grayravens.com' + $(element).find('a').attr('href');
                const imgUrl = 'https:' + $(element).find('img').attr('src');
                const title = $(element).find('a').attr('title');

                results.push({
                    title: title,
                    characterUrl: characterUrl,
                    imgUrl: imgUrl
                });
            });

            return results;
        } else {
            console.error(`Terjadi kesalahan: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error(`Terjadi kesalahan: ${error.message}`);
        return [];
    }
}



async function GetCharacterInfo(characterUrl) {
    try {
        const response = await axios.get(characterUrl);
            const results = [];
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);


            const characterName = $('.name').text().trim();
            const characterFrame = $('.frame').text().trim();
            const characterBiography = $('.biography #content').text().trim();
            const characterSpecialty = $('.speciality #content').text().trim();
            const characterElement = $('.element #content').text().trim();


            const rank = $('.rank #text').text().trim();
            const characterClass = $('.class #text').text().trim();
            const weapon = $('.archetype #text').text().trim();
            const signatureWeapon = $('.signature-weapon #text').text().trim();
            const faction = $('.army #text').text().trim();
            const gift = $('.gift #text').text().trim();

            results.push({
                name: characterName,
                frame: characterFrame,
                biography: characterBiography,
                specialty: characterSpecialty,
                element: characterElement,
                rank: rank,
                class: characterClass,
                weapon: weapon,
                signatureWeapon: signatureWeapon,
                faction: faction,
                gift: gift
            });
            return results;
        } else {
            console.error(`Terjadi kesalahan: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error(`Terjadi kesalahan: ${error.message}`);
        return null;
    }
}
module.exports = {
  GetCharacterInfo,
  getCharList,
}