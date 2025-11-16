import Moment from '#models/moment'
import Comment from '#models/comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  public async index({ response }: HttpContext) {
    const comments = await Comment.all()

    response.status(200)

    return {
      data: comments,
    }
  }

  public async show({ params, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)

    response.status(200)

    return {
      data: comment,
    }
  }

  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const exists = await Moment.findOrFail(body.moment_id)
    if (!exists) {
      response.status(404)
      return {
        message: 'Momento não encontrado',
      }
    }

    const comment = await Comment.create(body)

    response.status(201)
    return {
      message: 'Comentario criado com sucesso',
      data: comment,
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const body = request.body()

    const comment = await Comment.findOrFail(params.id)

    comment.merge(body)
    await comment.save()

    response.status(200)
    return {
      message: 'Comentario atualizado com sucesso',
      data: comment,
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)

    await comment.delete()

    response.status(200)
    return {
      message: 'Comentario deletado com sucesso',
    }
  }
}
