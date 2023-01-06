import { Environment } from '../../../environment/index';
import { Api } from '../axios-config';

export interface ICitiesList {
    id: number;
    nome: string;
}

export interface ICitiesDetails {
    id: number;
    nome: string;
}

type TCitiesWithTotalCount = {
    data: ICitiesList[];
    totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TCitiesWithTotalCount | Error> => {
    try {
      const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
  
      const { data, headers } = await Api.get(urlRelativa);
  
      if (data) {
        return {
          data,
          totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
        };
      }
  
      return new Error('Erro ao listar os registros.');
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
  };

const getById = async (id: number): Promise<ICitiesDetails | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;

        const { data } = await Api.get(urlRelativa);

        if (data) return data;

        return new Error('Erro ao consultar o registro.');

    } catch (error) {
        console.error(error);

        return new Error((error as  {message:string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<ICitiesDetails, 'id'>): Promise<number | Error> => {
    try {
        const urlRelativa = '/cidades';

        const { data } = await Api.post<ICitiesDetails>(urlRelativa, dados);

        if (data) return data.id;

        return new Error('Erro ao criar o registro.');

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: ICitiesDetails ): Promise<void | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;

        await Api.put(urlRelativa, dados);

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;

        await Api.delete(urlRelativa);

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao apagar o registro.');
    }
};



export const CitiesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};