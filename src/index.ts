import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { DataTypes, Sequelize } from "sequelize";
// import bcrypt from 'bcrypt';

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const User = sequelize.define("users", {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  })

const FreeGame = sequelize.define("free-games", {
    nom: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    prix: {
      type: DataTypes.STRING
    }
  })

const OfficialGame = sequelize.define("official-games", {
    nom: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
  })

sequelize.sync();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 1992

// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

app.post('/api/auth/local/register', (req, res) => {
    res.send('Utilisateur créé')
})

app.post('/api/auth/local', (req, res) => {
    res.send('Connection en cours')
})

app.get('/api/users/me', (req, res) => {
    res.send('JWT reçu')
})

app.get('/api/auth/change-password', (req, res) => {
    res.send('mot de passe modifié')
})

app.post('/api/free-games', (req, res) => {
    res.send('nouveau jeu gratuit ajouté')
})

app.get('/api/free-games', (req, res) => {
    res.send('jeux gratuits')
})

app.get('/api/free-games/:id', (req, res) => {
    res.send('sélection jeu gratuit par id')
})

app.put('/api/free-games/:id', (req, res) => {
    res.send('modif jeu gratuit après sélection par id')
})

app.delete('/api/free-games/:id', (req, res) => {
    res.send('supression jeu gratuit après sélection par id')
})

app.post('/api/official-games', (req, res) => {
    res.send('nouveau jeu payant ajouté')
})

app.get('/api/official-games', (req, res) => {
    res.send('jeux payants')
})

app.get('/api/official-games/:id', (req, res) => {
    res.send('sélection jeu payant par id')
})


app.put('/api/official-games/:id', (req, res) => {
    res.send('modif jeu payant après sélection par id')
})

app.delete('/api/official-games/:id', (req, res) => {
    res.send('supression jeu payant après sélection par id')
})









app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})

