import type { HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid'
import Moment from '#models/moment'
import app from '@adonisjs/core/services/app'

export default class MomentsController {
  public async index({ response }: HttpContext) {
    const moments = await Moment.query().preload('comments')

    response.status(200)
    return {
      data: moments,
    }
  }

  public async show({ params }: HttpContext) {
    const moment = await Moment.query().where('id', params.id).preload('comments').firstOrFail()
    return {
      data: moment,
    }
  }

  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`
      await image.move(app.makePath('uploads'), {
        name: imageName,
      })

      body.image = `/uploads/${imageName}`
    }

    const moment = await Moment.create(body)

    response.status(201)

    return {
      message: 'Momento criado com sucesso',
      data: moment,
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const moment = await Moment.findOrFail(params.id)
    const body = request.body()

    moment.title = body.title
    moment.description = body.description

    if (moment.image !== body.image || !moment.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`
        await image.move(app.makePath('uploads'), {
          name: imageName,
        })

        moment.image = `/uploads/${imageName}`
      }
    }

    await moment.save()

    response.status(200)

    return {
      message: 'Momento atualizado com sucesso',
      data: moment,
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const moment = await Moment.findOrFail(params.id)
    await moment.delete()

    response.status(200)

    return {
      message: 'Momento deletado com sucesso',
    }
  }

  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }
}
