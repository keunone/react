const user = {
  "id": 1,
  "name": "admin",
  "groupId": "1",
  "loginName": "admin",
  "password": "admin",
  "token": "amslcnkasndlksadn",
  "expires": 1*24*3600
}

module.exports = {
  'POST /api/login'(req, res) {
    const { loginName, password } = req.body
    if (loginName === user.loginName && password === user.password) {
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie('token', JSON.stringify({ id: user.id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      })
      res.json(user).end()
    } else {
      res.status(403).end()
    }
  },
  'GET /api/logout'(req, res) {
    res.clearCookie('token')
    res.status(200).end()
  }
}
