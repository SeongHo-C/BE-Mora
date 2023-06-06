const express = require('express');
const router = express.Router();
const adminController = require('./controller');
const { loginRequired } = require('../../middlewares');
const { serviceHandler } = require('../../utils');

router.post(
  '/admin/register',
  serviceHandler(adminController.addAdmin)
  //  #swagger.description = '관리자 등록'
  //  #swagger.tags = ['admins']
  /*  #swagger.parameters[''] = {
                in: 'body',
                schema: {
                    name: '관리자',
                    email: 'admin',
                    password: '1234', 
                }
} */
  /*  #swagger.responses[201] = {
            description: '관리자 등록 성공',
            schema: {
                message: '관리자를 생성하였습니다.'
            }
} */
  /*  #swagger.responses[400] = {
            description: 'body 또는 params를 입력받지 못한 경우',
            schema: {
                message: '데이터 형식이 올바르지 않습니다.'
            }
} */
);

router.post(
  '/admin/login',
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
  /*  #swagger.responses[201] = {
            description: '관리자 로그인 성공',
            schema: {
                message: '관리자 아이디로 로그인했습니다.'
            }
} */
  /*  #swagger.responses[400] = {
            description: 'body 또는 params를 입력받지 못한 경우',
            schema: {
                message: 'email 또는 password 입력값이 올바르지 않습니다.'
            }
} */
);

router.get(
  '/admin/info',
  loginRequired,
  serviceHandler(adminController.getAdmin)
  //  #swagger.description = '현재 로그인한 관리자 정보 조회'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[201] = {
            description: '관리자 정보 조회 성공',
            schema: {
                data: [
                  {
                    id: 'uuid', 
                    name: '관리자',
                    email: 'admin',
                    password: '1234', 
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z'
                  }
                ]
            }
  } */
);

router.get(
  '/admin/:adminInfo',
  loginRequired,
  serviceHandler(adminController.getAdmins)
  //  #swagger.description = '모든 관리자 정보 조회'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[201] = {
            description: '관리자 정보 조회 성공',
            schema: {
                data: [
                  {
                    id: 'uuid', 
                    name: '관리자',
                    email: 'admin',
                    password: '1234', 
                    createdAt: '2023-06-03T16:19:06.000Z',
                    updatedAt: '2023-06-03T16:19:06.000Z'
                  }
                ]
            }
  } */
);

router.patch(
  '/admin/:email',
  loginRequired,
  serviceHandler(adminController.setAdmin)
  //  #swagger.description = '관리자 정보 수정'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[404] = {
            description: '해당하는 관리자가 존재하지 않을 경우',
            schema: {
                message: '관리자 수정 처리에 실패하였습니다.'
            }
  } */
);

router.delete(
  '/admin/:email',
  loginRequired,
  serviceHandler(adminController.deleteAdmin)
  //  #swagger.description = '관리자 정보 삭제'
  //  #swagger.tags = ['admins']
  /*  #swagger.responses[404] = {
            description: '해당하는 관리자가 존재하지 않을 경우',
            schema: {
                message: '관리자 탈퇴 처리에 실패하였습니다.'
            }
  } */
);

module.exports = router;
