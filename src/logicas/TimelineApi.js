import { listagem, comentario, like, notificacao } from '../actions/actionCreator';

export default class TimelineApi {

    static lista(urlPerfil){
        return dispatch => {
            fetch(urlPerfil)
              .then(response => response.json())
              .then(fotos => {
                  dispatch(listagem(fotos));
                  return fotos;
            });
        }
    }

    static comenta(fotoId,textoComentario){
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({texto : textoComentario}),
                headers: new Headers({
                    'Content-type' : 'application/json'
                })
            }
            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
                .then(response => {
                    if(response.ok){
                        return response.json();
                    }else{
                        throw new Error('Não foi possivel comentar');
                    }
                })
                .then(novoComentario => {
                    dispatch(comentario(fotoId, novoComentario));
                    return novoComentario;
                });
        }
    }

    static like(fotoId){
      return dispatch => {
          fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{ method: 'POST'})
               .then(response => {
                   if(response.ok){
                       return response.json();
                   }else{
                     throw new Error('Nao foi possivel dar like na foto');
                   }
               })
               .then(liker => {
                   dispatch(like(fotoId, liker));
                   return liker;
               });
       }
    }

    static pesquisa(login){
        return dispatch => {
          fetch(`http://localhost:8080/api/public/fotos/${login}`)
              .then(response => response.json())
              .then(fotos => {
                  if(fotos.length === 0){
                      dispatch(notificacao('Usuario não encontrado!'));
                  }else{
                      dispatch(notificacao('Usuario encontrado'));
                  }

                  if(login === ''){
                      fotos = [];
                  }
                  dispatch(listagem(fotos));
                  return fotos;
              })
        }
    }


}
