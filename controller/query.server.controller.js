'use strict';

const fs       = require('fs');
const path     = require('path');
const express  = require('express');
const mongoose = require('mongoose');
const request  = require('request');
const cheerio  = require('cheerio');
const tinify   = require('tinify');
const Jimp     = require('jimp');
const Query = require('../models/query.server.model');
let docCount = 0;
tinify.key = "o3bESEnHWx-aRMirmKpwQMrm391oG8mO";
let fileName = [];

exports.searchGoogle = (req, ress) => {
    try {

        let requestString = req.params.queryString.toLowerCase();

        Query.count({}, (err, count) => {
            console.log(count);
            docCount = count;
        });

        Query.find({query: requestString}, function (err, res) {

            if(err){
                console.log(err);
            }

            if(res[0] == undefined || res == null){
                let entry = new Query({
                    query: requestString
                });

                entry.save(function (err) {
                    console.log(err);
                });

                saveImage(requestString, (data) => {
                    console.log(data);
                    ress.contentType('application/json');
                    ress.send(JSON.parse(data));
                });

            } else {
                console.log("Already Server");
                returnSavedFiles(requestString, (data) => {
                    fileName = [];
                    console.log(data);
                    ress.contentType('application/json');
                    ress.send(JSON.parse(data));
                })
            }
        })
    } catch (error) {
        ress.writeHead(500, {'Content-Type':'text/plain'});
        ress.end("Error Occured");
    }
}


const saveImage = (query, callback) => {

    let Url = 'https://www.google.com/search?tbm=isch&q='+query+'&gws_rd=ssl';
    let urls = [];

    request(Url, (error, response, body) => {

        if(!error){

            let $ = cheerio.load(body);

            let imgNodes = $('#ires td a img');

            for(let i = 0; i <= 14; i++){

                let imgNode = imgNodes[i];
                urls.push(imgNode.attribs['src']);

            }
            
            fs.mkdir(path.join(__dirname,'..','www','Photos',query), function (error) {

                if(error) throw error;

                if(!error){
                    let j = 0;
                    urls.map((url) => {
                        var source = tinify.fromUrl(url);
                        source.toFile(path.join(__dirname,'..','www','Photos', query,"optimized_"+ ++j +".jpg"));
                    });
                }
            });
        }
        callback(JSON.stringify(urls));
    })
};

exports.getAllQueries = (req, res) => {
    Query.find(( err, response) => {
        console.log(response);
        res.contentType('application/json');
        res.send(response);
    })
};

const returnSavedFiles = (req, callback) =>{
    fs.readdir(path.join(__dirname,'..','www','Photos', req), function (err, files) {
//         Jimp.read(fileName[0], (err, image) => {
// //         if (err) throw err;
// //         image.greyscale().write(fileName[0]);
// //     });
        console.log(path.join(__dirname,'..','www','Photos', req));
        console.log(files);
        for(let k = 0; k < files.length; k++){
            fileName.push('http://localhost:3000/Photos/'+req+'/'+files[k]);
        }
        callback(JSON.stringify(fileName));
    })
};     

//part for B and W

// var rp = require("request-promise");
// var cheerio = require("cheerio");
//   var query = 'car';
//   var url = "https://www.google.com/search?tbm=isch&q="+query+"&gws_rd=ssl&tbs=isz:l";
// var tinify = require('tinify');
// var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require('fs'));
// var path = require('path');
// tinify.key = "o3bESEnHWx-aRMirmKpwQMrm391oG8mO";
// var imageGrayScale = require('image-grayscale');
// var globby = require('globby');
// var Jimp = require('jimp');
//  let fileName = [];
// // var imgObj = __dirname+'/optimized.jpg';
// // globby([__dirname+'/Photos/Cats/optimized1.jpg']).then(function (paths) {
// //     return Promise.all(paths.map(function (e) {
// //       return imageGrayScale(e, { logProgress: 1 });
// //     }));
// //   })
// //   .then(() => {
// //     // fires when no error (not supported file is error) (Promise.all)
// //     console.log('finish');
// //   })
// //   .catch(err => {
// //     // fires once even if one error (Promise.all)
// //     if (err) console.log(err);
// //   });

//  rp(url).then(function (body) {

//     var $ = cheerio.load(body);
//         var imgNodes = $('#ires td a img');
//         // imgNodes is merely an array-like object, sigh.
//         // This is purposedly old-school JS because newer stuff doesn't work:
//         var urls = [];
//         for(let i = 0; i <= 14; i++){
//             let imgNode = imgNodes[i];
//             urls.push(imgNode.attribs['src']);
//         }  
//     // console.log(urls);

//     const processCompress = function() {
//         return fs.mkdirAsync(path.join(__dirname, 'Photos', query)).then(function(error) {
//             let j = 0;
//             return Promise.map(urls, function(url) {
//                 var source = tinify.fromUrl(url);
//                 return source.toFile(path.join(__dirname, 'Photos', query, "optimized_" + ++j + ".jpg"));
//             });
//         });
//     };

//     const getFiles = function() {
//         return fs.readdirAsync(path.join(__dirname, 'Photos', query)).then(function(files) {
//             return files.map(function(file) {
//                 return fileName.push(path.join(__dirname, 'Photos', query, file));
//             });
//         });
//     };

//         function colourMeBw() {
//         return Promise.map(fileName, function(file) {
//             console.log(file);
//             return Jimp.read(file, (err, image) =>{ if(err){throw err} image.greyscale().write(file)});
//         });
//     }
//     return processCompress().then(getFiles).then(colourMeBw);

// //   console.log(fileName);
// //     Jimp.read(fileName[0], (err, image) => {
// //         if (err) throw err;
// //         image.greyscale().write(fileName[0]);
// //     });

// });
