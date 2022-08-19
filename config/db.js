import mongoose from "mongoose";

const conectarDB = async () => {
 
  try {
    const connection = await mongoose.connect(process.env.MOONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const url = `${connection.connection.host}:${connection.connection.port}`;

    console.log(`Moongo DB conectado En: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
