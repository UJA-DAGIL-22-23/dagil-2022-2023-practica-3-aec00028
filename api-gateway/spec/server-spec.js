/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de MS Plantilla', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/Rugby/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/Rugby/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");
          assert(res.body.autor === "Álvaro Expósito Carrillo");
          assert(res.body.email === "aec00028@red.ujaen.es");
          assert(res.body.fecha === "28/03/2023");

        })
        .end((error) => { error ? done.fail(error) : done() })

    });

  })
});

describe('API Gateway: acceso a ', () => {
  describe('BBDD Personas', () => {
      it(' > Obtener todas las personas: debe tener un campo data que es un array de 11 objetos', (done) => {
          supertest(app)
              .get('/Rugby/getTodas')
              .expect(200)
              .expect('Content-Type', /json/)
              .expect(function (res) {
                  //console.log( "Get Todos Personas", res.body ); // Para comprobar qué contiene exactamente res.body
                  assert(res.body.data[0].data.hasOwnProperty('id'));
                  assert(res.body.data[2].data.nombre === "William");
                  assert(res.body.data.length === 11);

              })
              .end((error) => { error ? done.fail(error) : done() })
      });
  });
});


