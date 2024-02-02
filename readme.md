# install express
npm install --save express

# install nodemom
npm install --save-dev nodemon

install mongodb server
# configurar environment in path C:\Program Files\MongoDB\Server\7.0\bin
# execute cmd admin

md \data
md \data\db

# run server local
mongod

# install mongoose
npm install --save mongoose

# subir imagen
npm install --save shortid multer

## install cors
npm install --save cors

## npm start

# install JWT
npm install --save jsonwebtoken bcrypt

## variable de entorno
npm install --sade dotenv

# password
QQrGKSaUEh7gNYiX

# mongo export
mongoexport -d restapi -c usuarios -o usuarios.json 

#mongo import
mongoimport --uri mongodb+srv://huanchoit:<PASSWORD>@cluster0.ndxvqwi.mongodb.net/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>


mongoimport --uri mongodb+srv://huanchoit:QQrGKSaUEh7gNYiX@cluster0.ndxvqwi.mongodb.net/huanchoit --collection usuarios --type json --file usuarios.json