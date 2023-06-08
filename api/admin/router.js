const express = require('express');
const router = express.Router();
const adminController = require('./controller');
const { adminRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/admins/register',
  serviceHandler(adminController.addAdmin)
  //  #swagger.description = '관리자 등록'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[201] = {
            description: '관리자 회원가입 성공',
            schema: {
                data: {
                  id: 'uuid', 
                  name: '관리자',
                  email: 'admin',
                  password: '1234', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z' 
                }
            }
  } */
  /*  #swagger.responses[400] = {
            description: '이미 존재하는 이메일이 있는 경우',
            schema: {
                message: '이미 존재하는 이메일입니다.'
            }
  } */
);

router.post(
  '/admins/login',
  serviceHandler(adminController.getAdminToken)
  //  #swagger.description = '관리자 로그인'
  //  #swagger.tags = ['admins']
  /*  #swagger.parameters[''] = {
                in: 'body',
                schema: {
                    email: 'admin',
                    password: '1234', 
                }
  } */
  /*  #swagger.responses[403] = {
            description: 'email 또는 password가 맞지 않는 경우',
            schema: {
                message: '이메일 또는 비밀번호 입력값이 올바르지 않습니다.'
            }
  } */
);

router.get(
  '/admins',
  adminRequired,
  serviceHandler(adminController.getAdmins)
  //  #swagger.description = '모든 관리자 정보 조회 ( 검색 범위 : 이름, 이메일 )'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[200] = {
            description: '관리자 정보 조회 성공',
            schema: {
                data: {
                  id: 'uuid', 
                  name: '관리자',
                  email: 'admin',
                  password: '1234', 
                  createdAt: '2023-06-03T16:19:06.000Z',
                  updatedAt: '2023-06-03T16:19:06.000Z' 
                }
            }
  } */
);

router.patch(
  '/admins/:email',
  adminRequired,
  serviceHandler(adminController.setAdmin)
  //  #swagger.description = '관리자 정보 수정'
  //  #swagger.tags = ['admins']
  /*  #swagger.parameters[''] = {
                  in: 'body',
                  schema: {
                    name: '관리자', 
                    password: '해쉬화된 비밀번호',
                  }
  } */
  /*  #swagger.responses[404] = {
    description: '해당 이메일이 없는 경우',
    schema: {
      message: '존재하지 않는 이메일입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '관리자 정보 수정 처리에 실패한 경우',
            schema: {
                message: '{이름} 관리자 정보 수정 처리에 실패했습니다.'
            }
  } */
);

router.delete(
  '/admins/:email',
  adminRequired,
  serviceHandler(adminController.deleteAdmin)
  //  #swagger.description = '관리자 정보 삭제'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[404] = {
    description: '해당 이메일이 없는 경우',
    schema: {
      message: '존재하지 않는 이메일입니다.'
    }
  } */
  /*  #swagger.responses[500] = {
            description: '관리자 정보 삭제 처리에 실패한 경우',
            schema: {
                message: '{이메일} 관리자 정보 삭제 처리에 실패했습니다.'
            }
  } */
);

module.exports = router;
