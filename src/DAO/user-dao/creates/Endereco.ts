import IEndereco from '../../../interfaces/UserInterfaces/enderecoInterface';
import { prismaClient } from '../../../database/prismaClient';

class Endereco {
  public async newEndereco(endereco: Omit<IEndereco, "id">) {
    try {
      const resultEndereco = await prismaClient.endereco.create({
        data: {
          bairro: endereco.bairro,
          cep: endereco.cep,
          cidade: endereco.cidade,
          estado: endereco.estado,
          logradouro: endereco.logradouro,
          complemento: endereco.complemento,
          latitude: endereco.latitude,
          longitude: endereco.longitude,
          apelido: endereco.apelido,
          numero: endereco.numero,
        },
      });

      console.log(resultEndereco);

      const result = await prismaClient.enderecoUsuario.create({
        data: {
          enderecoId: String(resultEndereco.id),
          userId: String(endereco.userId),
        },
        include: {
          endereco: true,
        },
      });

      return result ? result : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async findByUser(id: String): Promise<any> {
    console.log(id);
    const rs = await prismaClient.enderecoUsuario.findMany({
      where: {
        userId: String(id),
      },
      include: {
        endereco: true,
      },
    });

    return rs.length > 0 ? rs : false;
  }

  public async findByUserEndereco(
    userId: String,
    enderecoId: String
  ): Promise<any> {
    const rs = await prismaClient.enderecoUsuario.findMany({
      where: {
        enderecoId: String(enderecoId),
        userId: String(userId),
      },
    });

    return rs.length > 0 ? true : false;
  }

  public async delete(enderecoId: String, userId: String): Promise<any> {
    try {
      console.log(userId);
      await prismaClient.enderecoUsuario.deleteMany({
        where: {
          enderecoId: String(enderecoId),
          userId: String(userId),
        },
      });

      await prismaClient.endereco.deleteMany({
        where: {
          id: String(enderecoId),
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  public async update(
    enderecoId: string,
    endereco: Omit<IEndereco, "id">
  ): Promise<any> {
    try {
      const rs = await prismaClient.endereco.updateMany({
        where: {
          id: String(enderecoId),
        },
        data: {
          apelido: endereco.apelido,
          bairro: endereco.bairro,
          cep: endereco.cep,
          cidade: endereco.cidade,
          complemento: endereco.complemento,
          estado: endereco.estado,
          latitude: endereco.latitude,
          longitude: endereco.longitude,
          logradouro: endereco.logradouro,
          numero: endereco.numero,
        },
      });

      const retorno = {
        id: String(enderecoId),
        apelido: endereco.apelido,
        bairro: endereco.bairro,
        cep: endereco.cep,
        cidade: endereco.cidade,
        complemento: endereco.complemento,
        estado: endereco.estado,
        latitude: endereco.latitude,
        longitude: endereco.longitude,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
      };

      return rs.count > 0 ? retorno : false;
    } catch (error) {
      return false;
    }
  }

  public async findById(id: String): Promise<any> {
    const endereco = await prismaClient.endereco.findUnique({
      where: {
        id: String(id),
      },
    });

    return endereco ? endereco : false;
  }
}

export default new Endereco();