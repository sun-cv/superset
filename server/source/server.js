function startServer(app)
{
    app.listen(process.env.PORT, () => 
    {
      console.log(`Server listening on http://localhost:${process.env.PORT}`);
    });
}

export default startServer;