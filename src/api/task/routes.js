/* eslint-disable object-curly-newline */
import express from 'express';
import { checkAuth, isValidUser } from '../../middleware';
import { fetchRecord, createRecord, updateRecord, deleteRecord, patchRecord } from './controller';

const router = express.Router();

/**
 * @api {get} /api/tasks?id={recordId} Retrieve Task records
 * @apiName RetrieveTask
 * @apiGroup Task
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/tasks?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of account headings belonging to one classification
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/tasks', [checkAuth, isValidUser], fetchRecord);

/**
 * @api {post} /api/tasks Create a Task record
 * @apiName CreateTask
 * @apiGroup Task
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name Task short name
 * @apiParam {String} tags Task tags are keywords
 * @apiParam {String} code Task code
 * @apiParam {ObjectId} category Task category
 * @apiParam {String} status Task status "PENDING|ASSIGNED|ONGOING|STARTED|ENDING|CLOSED"
 * @apiParam {String} title Task title
 * @apiParam {String} description Task description explanation and expectations
 * @apiParam {Number} manhour Task manhour estimated manhour required
 * @apiParam {Number} completion Task completion current Percent executed
 * @apiParam {Array} feedbacks Task feedbacks by User assignedTo
 * @apiParam {Date} startDate Task startDate assignedTo mark as started
 * @apiParam {Date} endDate Task endDate User assignedTo mark as ended
 * @apiParam {Date} assignedDate Task assignedDate
 * @apiParam {ObjectId} assignedTo Task assignedTo User performing the task
 * @apiParam {ObjectId} assignedBy Task assignedBy User created the task
 * @apiParam {Number} score Task score by User assignedBy
 * @apiParam {String} remark Task remark by User assignedBy
 * @apiParam {ObjectId} voucher Task voucher for needed funds by User assignedTo
 * @apiParam {Array} assignments Task array of Assignment resources User assignedTo
 * @apiParam {Boolean} recurring Task recurring status
 * @apiParam {String} recurring Task frequency
 * @apiParam {String} subsidiary Task subsidiary conducting the task
 * @apiParam {ObjectId} office Task office id conducting the task
 * @apiSuccess {Object} Task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 * @apiError 401 master access only.
 */
router.post('/tasks', [checkAuth, isValidUser], createRecord);

/**
 * @api {put} /api/tasks/{recordId} Update a Task record
 * @apiName UpdateTask
 * @apiGroup Task
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name Task short name
 * @apiParam {String} tags Task tags are keywords
 * @apiParam {String} code Task code
 * @apiParam {ObjectId} category Task category
 * @apiParam {String} status Task status "PENDING|ASSIGNED|ONGOING|STARTED|ENDING|CLOSED"
 * @apiParam {String} title Task title
 * @apiParam {String} description Task description explanation and expectations
 * @apiParam {Number} manhour Task manhour estimated manhour required
 * @apiParam {Number} completion Task completion current Percent executed
 * @apiParam {Array} feedbacks Task feedbacks by User assignedTo
 * @apiParam {Date} startDate Task startDate assignedTo mark as started
 * @apiParam {Date} endDate Task endDate User assignedTo mark as ended
 * @apiParam {Date} assignedDate Task assignedDate
 * @apiParam {ObjectId} assignedTo Task assignedTo User performing the task
 * @apiParam {ObjectId} assignedBy Task assignedBy User created the task
 * @apiParam {Number} score Task score by User assignedBy
 * @apiParam {String} remark Task remark by User assignedBy
 * @apiParam {ObjectId} voucher Task voucher for needed funds by User assignedTo
 * @apiParam {Array} assignments Task array of Assignment resources User assignedTo
 * @apiParam {Boolean} recurring Task recurring status
 * @apiParam {String} recurring Task frequency
 * @apiParam {String} subsidiary Task subsidiary conducting the task
 * @apiParam {ObjectId} office Task office id conducting the task
 * @apiSuccess {Object} Task Task's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Task not found.
 * @apiError 401 master access only.
 */
router.put('/tasks/:recordId', [checkAuth, isValidUser], updateRecord);

/**
 * @api {patch} /api/tasks/{recordId} Patch tasks
 * @apiName PatchTask
 * @apiGroup Task
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task not found.
 * @apiError 401 master access only.
 */
router.patch('/tasks/:recordId', [checkAuth, isValidUser], patchRecord);

/**
 * @api {delete} /api/tasks/{recordId} Delete a Task record
 * @apiName DeleteTask
 * @apiGroup Task
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Task not found.
 * @apiError 401 master access only.
 */
router.delete('/tasks/:recordId', [checkAuth, isValidUser], deleteRecord);

export default router;
