const { User, Role } = require("../models/index");
const BaseController = require("./baseController");
const responseHelper = require('../helpers/response');

class AuthController extends BaseController{
  constructor(){
    super(User);
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.model.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw ({
          name: "NOT_FOUND",
          message: "Email not found",
        });
      }

      const validPassword = await user.validPassword(password);

      if (!validPassword) {
        throw ({
          name: "BAD_REQUEST",
          message: "Invalid Password",
        });
      }

      const response = responseHelper.success({
        email: user.email,
        token: user.generateToken()
      }, 'User logged in successfully', 200)

      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  register = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      const findRole = await Role.findOne({
        where: {
          name: role || "user",
        },
      });

      if (!findRole) {
        throw ({
          name: "NOT_FOUND",
          message: "Role not found",
        });
      }

      const findExistUser = await this.model.findOne({
        where: {
          email: email
        },
      });

      if (findExistUser) {
        throw ({
          name: "BAD_REQUEST",
          errors: {
            email: ["email has already been used"]
          },
        });
      }

      const user = await this.model.create({
        name,
        email,
        password,
        RoleId: findRole.id
      });
      
      const token = user.generateToken();

      const response = responseHelper.success({
        email: user.email,
        token
      }, 'User registered successfully', 201)

      
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;