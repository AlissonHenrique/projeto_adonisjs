
class Team {
  async handle({ request, auth, response }, next) {
    const slug = await require.header('TEAM')
    let team = null

    if (slug) {
      team = await auth.user.teams().where('slug').first()
    }
    if (!team) {
      return response.status(401).send()
    }

    auth.user.currentTeam = team.id
    request.team = team

    await next()
  }
}

module.exports = Team
