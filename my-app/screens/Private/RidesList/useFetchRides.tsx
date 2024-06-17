import { useState, useEffect, useCallback } from "react";
import { api } from "../../../server/api";

interface Ride {
  id_carona: number;
  origem: string;
  destino: string;
  data: string;
  horario_de_partida: string;
  horario_de_retorno?: string;
  motorista: {
    id: number;
    nome: string;
  };
}

const useFetchAllRides = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRides = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/carona/todasCaronas');
      const mappedRides = response.data.map((ride: any) => ({
        id_carona: ride.id_carona,
        origem: ride.origem,
        destino: ride.destino,
        data: ride.data,
        horario_de_partida: ride.horario_de_partida,
        horario_de_retorno: ride.horario_de_retorno,
        motorista: ride.motorista ? {
          id: ride.motorista.id,
          nome: ride.motorista.nome,
        } : {
          id: 0,
          nome: "Nome não disponível",
        },
      }));
      setRides(mappedRides);
    } catch (err) {
      setError("Erro ao buscar caronas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  return { rides, loading, error, fetchRides };
};

export default useFetchAllRides;
