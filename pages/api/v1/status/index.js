function status(request, response) {
  response.status(200).json({ response: "tudo certo" });
}

export default status;
