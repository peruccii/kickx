export default interface IEndereco {
  id: string;
  userId: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string | null;
  apelido: string;
  numero: string;
  latitude: number;
  longitude: number;
}