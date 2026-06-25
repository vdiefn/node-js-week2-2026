const { formidable } = require('formidable')
const path = require('node:path')
const errorHandler = require("./errorHandler")

const handleUpload = (req, res, config) => {
  const form = formidable({
    uploadDir: config.uploadDir,
    maxFileSize: config.maxFileSize,
    keepExtensions: true,
  })

  form.on("error", (err) => {
    if(res.headersSent) return
    errorHandler(res, 500, err.message)
  })

  form.parse(req, (err, fields, files) => {
    if(err){
      if(res.headersSent) return
      errorHandler(res, 500, err.message)
      return
    }

    const file = files.file?.[0]
    if(!file){
      if(res.headersSent) return
      errorHandler(res, 400, "No file uploaded")
      return
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({
      filename: file.originalFilename,
      sizeKB: Number(file.size)/1024,
      ext: path.extname(file.originalFilename),
      savedPath: file.filepath
    }))
  })
}

module.exports = handleUpload;