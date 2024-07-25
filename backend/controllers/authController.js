// controllers/authController.js


export const getAuthStatusController = async (req, res) => {
  const { user } = req.user
  res.json({
    message: 'Auth routes working',
    user,
    accessToken: req.cookies.access_token,
  })
}

export const debugAuthController =async (req, res) => {
  res.json({ user: req.user })
}


