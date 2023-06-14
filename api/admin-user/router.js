const express = require('express');
const router = express.Router();
const adminUserController = require('./controller');
const { adminRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/adminUsers',
  adminRequired,
  serviceHandler(adminUserController.addUser)
  //  #swagger.description = '사용자 등록'
  //  #swagger.tags = ['admin-user']
  /*  #swagger.responses[201] = {
            description: '사용자 생성 성공',
            schema: {
                data: {
                  id: 'd4bdf4e9-2191-46bd-b659-499e9d901d3b', 
                  name: '사용자',
                  email: 'user@gmail.com',
                  password: '1234', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                }
            }
  } */
  /*  #swagger.responses[400] = {
            description: '이미 존재하는 이메일이 있는 경우',
            schema: {
                message: '이미 존재하는 이메일입니다.'
            }
  } */
  /*  #swagger.responses[500] = {
            description: '사용자 등록 OR 사용자 기본 상세 정보 등록 처리에 실패한 경우',
            schema: {
                message: '사용자 등록 OR 사용자 기본 상세 정보 등록 처리에 실패했습니다.'
            }
  } */
);

router.get(
  '/adminUsers',
  adminRequired,
  serviceHandler(adminUserController.getUsers)
  //  #swagger.description = '사용자 조회'
  //  #swagger.tags = ['admin-user']
  /*  #swagger.responses[200] = {
            description: '사용자 정보 조회 성공',
            schema: {
                data: {
                  id: 'd4bdf4e9-2191-46bd-b659-499e9d901d3b', 
                  name: '사용자',
                  email: 'user@gmail.com',
                  password: '1234', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                }
            }
  } */
);

router.get(
  '/adminUsers/:id',
  adminRequired,
  serviceHandler(adminUserController.getDetail)
  //  #swagger.description = '사용자 상세 조회'
  //  #swagger.tags = ['admin-user']
  /*  #swagger.responses[200] = {
            description: '사용자 정보 상세 조회 성공',
            schema: {
                data: {
                  id: 'd4bdf4e9-2191-46bd-b659-499e9d901d3b', 
                  name: '사용자',
                  email: 'user@gmail.com',
                  createdAt: '2023-06-03T16:19:06.000Z',
                  UserDetail: { 
                    img_path: 'http://www.moyeora-racer.com:5000/default1686549448163.png'
                  }
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '해당 사용자가 없는 경우',
    schema: {
      message: '존재하지 않는 사용자입니다.'
    }
  } */
);

router.patch(
  '/adminUsers/:email',
  adminRequired,
  serviceHandler(adminUserController.setUser)
  //  #swagger.description = '사용자 정보 수정'
  //  #swagger.tags = ['admin-user']
  /*  #swagger.responses[200] = {
            description: '사용자 정보 수정 성공',
            schema: {
                data: {
                  id: 'd4bdf4e9-2191-46bd-b659-499e9d901d3b', 
                  name: '사용자',
                  email: 'user@gmail.com',
                  password: '1234', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '해당 이메일이 없는 경우',
    schema: {
      message: '존재하지 않는 이메일입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '사용자 정보 수정 처리에 실패한 경우',
            schema: {
                message: '{이름} 사용자 정보 수정 처리에 실패했습니다.'
            }
  } */
);

router.delete(
  '/adminUsers/:email',
  adminRequired,
  serviceHandler(adminUserController.deleteUser)
  //  #swagger.description = '사용자 정보 삭제'
  //  #swagger.tags = ['admin-user']
  /*  #swagger.responses[200] = {
            description: '사용자 정보 삭제 성공',
            schema: {
                data: {
                  id: 'd4bdf4e9-2191-46bd-b659-499e9d901d3b', 
                  name: '사용자',
                  email: 'user@gmail.com',
                  password: '1234', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                }
            }
  } */
  /*  #swagger.responses[404] = {
    description: '해당 이메일이 없는 경우',
    schema: {
      message: '존재하지 않는 이메일입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '사용자 정보 삭제 처리에 실패한 경우',
            schema: {
                message: '{이메일} 사용자 정보 삭제 처리에 실패했습니다.'
            }
  } */
);

module.exports = router;
