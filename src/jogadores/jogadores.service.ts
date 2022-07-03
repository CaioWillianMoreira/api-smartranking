import { Injectable, Logger } from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import {v4 as uuid} from 'uuid'

@Injectable()
export class JogadoresService {

  private jogadores: Jogador[] = [];

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {

    const { email } = criaJogadorDto;

    // se o jogador já existir no array retorna
    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else {
      await this.criar(criaJogadorDto)
    }

  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const {nome, telefoneCelular, email} = criaJogadorDto

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg'
    }
    this.logger.log(`${JSON.stringify(jogador)}`)
    this.jogadores.push(jogador)
  }

  private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const {nome} = criarJogadorDto
    jogadorEncontrado.nome = nome
  }
}
