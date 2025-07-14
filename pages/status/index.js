import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 20000,
  });
  let dadosFormatados = {};

  if (!isLoading && data) {
    console.log("data", data);
    dadosFormatados.ultimaAtualizacao = new Date(
      data.updated_at,
    ).toLocaleString("pt-BR");
    dadosFormatados = {
      ultimaAtualizacao: new Date(data.updated_at).toLocaleString("pt-BR"),
      database: {
        maximoDeConexoes: data.dependencies.database.max_connections,
        conexoesAbertas: data.dependencies.database.opened_connections,
        versao: data.dependencies.database.version,
      },
    };
  }

  return (
    <>
      {isLoading ? (
        <div>carregando...</div>
      ) : (
        <div>
          <p>Última atualização: {dadosFormatados.ultimaAtualizacao}</p>
          <p>Máximo de conexões: {dadosFormatados.database.maximoDeConexoes}</p>
          <p>Conexões abertas: {dadosFormatados.database.conexoesAbertas}</p>
          <p>Versão: {dadosFormatados.database.versao}</p>
        </div>
      )}
    </>
  );
}
