import { createServer } from 'http';
import { Server } from 'socket.io';
import { supa } from '../../supabase';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinSession', async (sessionId) => {
    const { data: session, error } = await supa
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    socket.join(sessionId);
    socket.emit('sessionData', session);
  });

  socket.on('sendMessage', (sessionId, message) => {
    io.to(sessionId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
