var express = require('express');
var app = express();
const puppeteer = require('puppeteer-extra');
var cheerio = require("cheerio");


app.get('/', function(req, res) {
    if (req.query.text) {

        (async function() {
            const massPromt = [
                'highly detailed, d & d, highly detailed, digital painting, trending on artstation, concept art, sharp focus, illustration, global illumination, ray tracing, realistic shaded, art by artgerm and greg rutkowski,super detailed picture, the smallest drawing of details, 4k, octane ,pastel halftones',

                'golden hour, awesome atmosphere, dean cornwell, norman rockwell, 8 k, octane rendered, sharp focus, highly detailed, volumetric lighting, illustration, concept art, paint texture, intricate, ruan jia, steve mccurry - n 9,super detailed picture, the smallest drawing of details, 4k, octane  ,pastel halftones',

                'andrei riabovitchev, marc simonetti, and sakimichan, trending on artstation,super detailed picture, the smallest drawing of details, 4k, octane ,pastel halftones',

                'behance hd, artstation, deviantart, global illumination radiating a glowing aura global illumination ray tracing hdr render in unreal engine 5,super detailed picture, the smallest drawing of details, 4k, octane,pastel halftones',

                'digital painting, highly detailed, artstation, sharp focus, illustration, concept art, ruan jia, steve mccurry, amazing composition, fractal flame,super detailed picture, the smallest drawing of details, 4k, octane,pastel halftones',

                'ultra-detailed, uhd 8k cryengine, octane render,super detailed picture, the smallest drawing of details, 4k, octane,highly detailed, digital painting, artstation, concept art, sharp focus, illustration, cinematic lighting, art by artgerm and greg rutkowski and alphonse mucha and simon stalenhag, high detail, artstation, octane render, 4 k resolution, masterpiece,pastel halftones',

                'insanely detailed, by dan mumford, yusuke murata, makoto shinkai, ross tran, intricate detail, cinematic, 8 k, featured on artstation, pixiv,super detailed picture, the smallest drawing of details, 4k, octane ,realistic,pastel halftones',

                'detailed portrait, cell shaded, 4 k, concept art, ilya kuvshinov, artgerm, krenz cushart, greg rutkowski,cinematic dramatic atmosphere, sharp focus, volumetric lighting, cinematic lighting, studio quality,super detailed picture, the smallest drawing of details, 4k, octane, illustration,pastel halftones',

                'chilling eastern europen forrest. night, horroristic shadows, higher contrasts, (((lumnious))), theatrical, character concept art by ruan jia, (((thomas kinkade))), and j.dickenson, trending on pinterest, artstation,pastel halftones',

                'elegant, glowing lights, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, alphonse muchas,super detailed picture,drawing of details, 4k, octanem,pastel halftones'
            ];
            let massText = massPromt[Math.floor(Math.random() * massPromt.length)];

            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();

            try {

                await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

                await page.goto('https://replicate.com/stability-ai/stable-diffusion/versions/8abccf52e7cba9f6e82317253f4a3549082e966db5584e92c808ece132037776/');
                await page.waitForTimeout('input[name="prompt"]');
                await page.$eval('input[name="prompt"]', el => el.value = '');
                await page.type('input[name="prompt"]', req.query.text + ' ' + massText, { delay: 5 });
                // await page.$eval('input[name="num_inference_steps"]', el => el.value = '');
                // await page.type('input[name="num_inference_steps"]', '30', { delay: 5 });
                await page.$eval('input[name="guidance_scale"]', el => el.value = '');
                await page.type('input[name="guidance_scale"]', '20', { delay: 5 });
                await page.click('#run > div > div > div > div.flex-1.min-w-0.pr-lh > form > button.form-button.mr-2.relative');

                // setTimeout(async() => {
                // }, "1000");
                await page.waitForSelector('#run > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > a > img');
                const imgSrc = await page.$eval('#run > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div > a > img', (el) => el.getAttribute('src'));

                res.send(imgSrc);

                await browser.close();

            } catch (err) {

                console.log("Возникла ошибка, попробуйте ещё раз!");

            }

            return false;


        })();

    } else {
        res.send('пусто накуй');
    }
});


app.listen(3000);