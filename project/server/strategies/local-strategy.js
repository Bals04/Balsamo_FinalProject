const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getAccounts } = require('../models/database'); // Adjust the path as needed

passport.serializeUser((user, done)=>{
  console.log("inside serialize user");
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser(async (name, done)=>{
  try {
    //ANG LOGS KAY PANG TEST RA NAKO SIR IF NISULOD BA JD SYA DIRI OR WALA HAHAH
    console.log("inside deserialize user");
    console.log(`Deserialize username: ${name}`);

    const accounts = await getAccounts(); // Fetch accounts from the database
    const user = accounts.find(account => account.username === name);
    if(!user) throw new Error("user not found!!!")
    done(null, user)
  } catch (error) {
    done(error,null)
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    //SAME HERE HAHHASHDAHDHASHD
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    try {
      const accounts = await getAccounts(); // Fetch accounts from the database tas gabase sya anang getAccounts ddto sa giimport nako sa taas
      const user = accounts.find(account => account.username === username);

      if (!user) {
        throw new Error("user not found")// diri magsugod ang authentication if naa ba ang account or wala
      }

      if (user.password !== password) {//checking of password
        throw new Error("password incorrect")
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
module.exports = passport;//exporting this para magamit sa lain file
