import User from "../models/User.mjs"

async function injectUser(req, res, next) {
  try {
    const user = await User.findByPk(1)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export default injectUser
