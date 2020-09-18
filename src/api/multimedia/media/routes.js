/* eslint-disable import/no-unresolved */
import express from 'express';
import appRoot from 'app-root-path';
import { checkAuth, isValidUser } from '../../../middleware';
import {
  createImageHandler,
  createVideoHandler,
  fetchHandler,
  updateHandler,
  deleteHandler,
  patchHandler,
} from './controller';

const router = express.Router();

/**
 * @api {get} /api/multimedia/upload to get the form for uploading Multimedia record
 * @apiName RetrieveUploadForm
 * @apiGroup Media
 * @apiDescription The sample form allows you to test the API by uploading
 * and image and entering the image name that would be saved on db
 */
router.get('/upload', (req, res) => {
  res.sendFile(`${appRoot}/src/upload/index.html`);
});

/**
 * @api {get} /api/multimedia/media?{query} Retrieve Multimedia record(s)
 * @apiName RetrieveMedias
 * @apiGroup Media
 * @apiHeader {String} Authorization authorization token
 * @apiDescription image-assets name and url are stored on db. The images themselves
 * are stored on the AWS Bucket. The url points to it.
 * @apiSuccess {Object[]} rows List of image-assets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/media', fetchHandler);

/**
 * @api {post} /api/multimedia/media Create Multimedia record
 * @apiName CreateMedia
 * @apiGroup Media
 * @apiHeader {String} Authorization authorization token
 * @apiParam {String} type Media type "DOC|PDF|IMAGE|AUDIO|VIDEO|DATA"
 * @apiParam {String} name Media name or title
 * @apiParam {String} url The Media url absolute-path
 * @apiParam {ObjectId} category Media Category
 * @apiParam {String} description Media description
 * @apiParam {Number} length Media length dimension in mm
 * @apiParam {Number} width Media width dimension in mm
 * @apiParam {Number} duration Media duration in minutes for audio/visual
 * @apiParam {Number} extension Media extension
 * @apiSuccess {Object} image-asset record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiDescription Medias uploaded to this endpoint are stored locally
 * on the backend server. This is only a fall back option when AWS is
 * no longer available.
 */
router.post('/media/image', [checkAuth, isValidUser], createImageHandler);
router.post('/media/video', [checkAuth, isValidUser], createVideoHandler);

/**
 * @api {put} /api/multimedia/media/{MediaId} Update Multimedia record
 * @apiName UpdateMedia
 * @apiGroup Media
 * @apiHeader {String} Authorization authorization token
 * @apiParam {String} recordId required record ObjectId
 * @apiParam {String} type Media type "DOC|PDF|IMAGE|AUDIO|VIDEO|DATA"
 * @apiParam {String} name Media name or title
 * @apiParam {String} url The Media url absolute-path
 * @apiParam {ObjectId} category Media Category
 * @apiParam {String} description Media description
 * @apiParam {Number} length Media length dimension in mm
 * @apiParam {Number} width Media width dimension in mm
 * @apiParam {Number} duration Media duration in minutes for audio/visual
 * @apiParam {Number} extension Media extension
 * @apiParam {String} url required image-asset url on cloud
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.put('/media/:recordId', [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/multimedia/media/{recordId} Patch Multimedia record
 * @apiName PatchMedia
 * @apiGroup Media
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Media not found.
 * @apiError 401 master access only.
 */
router.patch('/media/:recordId', [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /api/multimedia/media/{recordId} Delete Multimedia record
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiHeader {String} Authorization authorization token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 image-asset not found.
 */
router.delete('/media/:recordId', [checkAuth, isValidUser], deleteHandler);

export default router;
