import express from "express";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";
import { DataTypes, Sequelize, where } from "sequelize";
import bcrypt from 'bcrypt';

const saltRounds = 10;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const User = sequelize.define("users", {
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
    prix: {
        type: DataTypes.STRING
    }
  })

sequelize.sync();
// sequelize.sync({ force: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 1992


app.post('/api/auth/local/register', async (req, res) => {
    // récupérer l'email de l'utilisateur dans la requête
    const myPlaintextPassword =  req.body.password;
    // chercher un utilisateur avec cette email dans la bdd
    const mailResearch = await User.findOne({ where: { email: req.body.email } });
    // Si la requête renvoie un utilisateur avec cet email
    if (mailResearch !== null) {
        // => erreur : déjà existant
        res.status(400).json({message: "utilsateur déjà utilisé"})
    }
    else {
        // hash du mot de passe
        const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        // new user
        const newUser = await User.create({
            email: req.body.email,
            password: hash
        })
        // repond avec le nouvel utilisateur sans le mot de passe (même hashé)
        const userData = newUser.dataValues
        delete userData.password
        res.json(newUser)
    }
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

// Routes de communication FreeGame
app.post('/api/free-games', async (req, res) => {
    const newFreeGame = await FreeGame.create({
        nom: req.body.data.nom,
        description: req.body.data.description,
        image: req.body.data.image
    })
    console.log('nouveau jeu gratuit ajouté');
    res.json(newFreeGame)
})

app.get('/api/free-games', async (req, res) => {
    const allFreeGames = await FreeGame.findAll();
    res.json(allFreeGames)
})

app.get('/api/free-games/:id', async (req, res) => {
    const gameSelectById = req.params.id
    const freeGameById = await FreeGame.findByPk(gameSelectById);
    res.json(freeGameById)
})

app.put('/api/free-games/:id', async (req, res) => {
    const gameSelectById = req.params.id
    const modifGameById = await FreeGame.findByPk(gameSelectById);
    const modified = await modifGameById?.update({
        nom: req.body.data.nom,
        description: req.body.data.description,
        image: req.body.data.image
    })
    res.json(modified)
})

app.delete('/api/free-games/:id', async (req, res) => {
    const gameSelectById = req.params.id
    const deleteGameById = await FreeGame.findByPk(gameSelectById);
    deleteGameById?.destroy()

    res.send('supression jeu gratuit via sélection id')
})

// Routes de communication OfficialGame
app.post('/api/official-games', async (req, res) => {
    const newGame = await OfficialGame.create({
        nom: req.body.data.nom,
        description: req.body.data.description,
        image: req.body.data.image,
        prix: req.body.data.prix
    })
    res.json(newGame)
})

app.get('/api/official-games', async (req, res) => {
    const allOffGames = await OfficialGame.findAll();
    res.json(allOffGames)
})

app.get('/api/official-games/:id', async (req, res) => {
    const gameSelectById = req.params.id
    const offGameById = await OfficialGame.findByPk(gameSelectById);
    res.json(offGameById)
})

app.put('/api/official-games/:id', async (req, res) => {
    const gameSelectById = req.params.id
    const modifGameById = await OfficialGame.findByPk(gameSelectById);
    const modified = await modifGameById?.update({
        nom: req.body.data.nom,
        description: req.body.data.description,
        image: req.body.data.image,
        prix: req.body.data.prix
    })
    res.json(modified)
})

app.delete('/api/official-games/:id', async (req, res) => {
    const gameSelectById = req.params.id
    const deleteGameById = await OfficialGame.findByPk(gameSelectById);
    deleteGameById?.destroy()

    res.send('supression jeu payant via sélection id')
})

app.listen(port, () => {
    console.log('serveur running on port : ' + port);
})

