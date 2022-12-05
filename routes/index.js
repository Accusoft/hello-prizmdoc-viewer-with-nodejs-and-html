const express = require('express');
const router = express.Router();
const joinPath = require('path').join;
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);
const pas = require('../pas/pasRequest');

// The document we will display
const DOCUMENT_NAME = 'example.pdf';

router.get('/', async (req, res /*, next*/) => {
  let prizmdocRes;

  // 1. Create a new viewing session
  prizmdocRes = await pas.post('/ViewingSession', { // See https://help.accusoft.com/PrizmDoc/latest/HTML/pas-viewing-sessions.html
    json: {
      source: {
        type: 'upload',
        displayName: DOCUMENT_NAME
      }
    }
  });
  const viewingSessionId = prizmdocRes.body.viewingSessionId;

  // 2. Send the viewingSessionId and viewer assets to the browser right away so the viewer UI can start loading.
  res.setHeader('Content-Security-Policy', 'script-src \'self\'');
  res.render('index', {
    title: 'Hello PrizmDoc Viewer!',
    viewingSessionId: viewingSessionId
  });

  // 3. Upload the source document to PrizmDoc so that it can start being converted to SVG.
  //    The viewer will request this content and receive it automatically once it is ready.
  prizmdocRes = await pas.put(`/ViewingSession/u${viewingSessionId}/SourceFile`, {
    body: await(readFileFromDocumentsDirectory(DOCUMENT_NAME))
  });
});

// Util function to read a document from the documents/ directory
async function readFileFromDocumentsDirectory(filename) {
  return readFile(joinPath(__dirname, '..', 'documents', filename));
}

module.exports = router;
