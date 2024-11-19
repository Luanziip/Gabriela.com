/*
 🇲  🇮  🇰  🇦 - 🇦  🇵  🇮 
͠ɪ͠ɴ͠ᴅ͠ɪ͠ᴜ͠ᴢ͠ɪ͠ɴ ͠ᴍ͠ᴅ·=»★«=·

feito com carinho por @indiuzin 🥷
aproveite eseja feliz 😁
*/

const express = require('express');
const axios = require('axios');
const path = require('path');
var fetch = require('node-fetch')
const fs = require('fs')

const { conn } = require('./config');
const { banner, banner2 } = require('./utils/banner');
const { logs, logsError, logsAviso, logsSusseco } = require('./utils/logs');
var { iaOrbital, iaOrbital2, iaOrbitalVerImg, iaOrbitalGerarImg } = require('./lib/ia.js')


const mika = express()
mika.use(
express.static(path.join(__dirname, "..", "paginas"
)))
mika.use(express.urlencoded({ extended: true }));
mika.use(express.json())


mika.get('/', (req, res) => { // by: indiuzin ♨️
     res.sendFile(path.join(__dirname, '..', 'paginas/inicio.html'));
});

mika.get('/api/rest', (req, res) => { // by: indiuzin ♨️
     res.sendFile(path.join(__dirname, '..', 'paginas/rest.html'));
});

mika.get('/api/painel', (req, res) => { // by: indiuzin ♨️
     res.sendFile(path.join(__dirname, '..', 'paginas/painel.html'));
});

mika.get('/api/admins', (req, res) => { // by: indiuzin ♨️
     res.sendFile(path.join(__dirname, '..', 'paginas/admins.html'));
});

mika.get('/usuarios', (req, res) => { // by: indiuzin ♨️
     res.sendFile(path.join(__dirname, '..', 'paginas/users.json'));
});

mika.listen(conn, () => {
  banner("MIKA|API")
  banner2("05/11/2024")
});

mika.get('/api/wallpaper', async (req, res) => {
          const pesqui = req.query.pesqui;
          if (!pesqui) return res.json({
               status: '❓',
               info: 'parâmetro pesqui será preciso.'
          });

          const apiKey = 'AkRTUu63McSvUVX8VGUc3rZICzGu1jFdQfaqljLcXfaM1VckCgueBEVf';
          const url = `https://api.pexels.com/v1/search?query=${pesqui}&per_page=1`;

          try {
               const response = await axios.get(url, {
                    headers: {
                         Authorization: apiKey
                    }
               });

               const image = response.data.photos[0].src.original;
               res.send({
                    status: '✅',
                    criador: '@indiuzin 🥷',
                    wallpaper: image
               });
          } catch (error) {
               res.status(500).json({
                    status: '❌',
                    info: 'Erro ao buscar o wallpaper.'
               });
          }
     });
     
mika.get('/api/figu', async(next, res) => {
try {
const figurinhaPath = './lib/figurinhas.json'
const figurinhas = JSON.parse(fs.readFileSync(figurinhaPath, 'utf-8'))
if(!Array.isArray(figurinhas) || figurinhas.length === 0) {
throw new Error('o arquivo JSON de figurinhas está vazio ou não é um array')
}
const figIndex = Math.floor(Math.random() * figurinhas.length)
const figUrl = figurinhas[figIndex]
const response = await fetch(figUrl)
const buffer = await response.buffer()
const outputPath = path.join(__dirname, 'tmp', 'figurinha.webp')
fs.writeFileSync(outputPath, buffer)
res.sendFile(outputPath, (err) => {
if (err) {
console.log(err)
return res.status(500).json({resposta: 'Erro ao enviar figurinha'})
}
fs.unlinkSync(outputPath)
})
}catch (error) {
console.log(error)
return res.status(500).json({resposta: `${error.message}`, status: 500})
}
})

  mika.get('/api/playmp3', (req, res) => {// criado por @indiuzin 🥷 nao tira meu crédito nao pfv
    const link = req.query.link;
    if (!link) {
      return res.json({
        info: 'falta o parâmetro link=URL_DO_YOUTUBE'
      });
    }
    
    const apiMitsuri = `https://mitsure-api.onrender.com/api/playmp3?url=${link}&apikey=MIT_KEY`;
    
    axios.get(apiMitsuri)
      .then(response => {
        const { download_url, thumbnail, title, author } = response.data;
        
        res.json({
          status: 'sucesso',
          criado: '@indiuzin 🥷',
          url_mp3: download_url,
          imgThub: thumbnail,
          info: title,
          nome: author
        });
      })
      .catch(error => {
        res.json({
          status: 'erro',
          erro: 'ocorreu um erro no sistema'
        });
      });
  });
  
 mika.get('/api/gerar-imagem', async(req, res, next) => {
nome = req.query.nome
 if (!nome) return res.json({ status : false, criador : `DEV LUAN`, mensagem : "Coloque o parametro: nome"})
iaOrbitalGerarImg(nome).then(data => {
res.json({
DONO: "@LUAN DEV😈",

PESQUISA: `${nome}`,

link: data
})}).catch(e => {
res.json({
msg: `Erro no Servidor Interno`
})})})

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Atualizado= ${__filename}`,)
	delete require.cache[file]
	require(file)
})