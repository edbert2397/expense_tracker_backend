import express from 'express';
import { 
    getActivities,

    getIncomebyUser,
    getTotalIncomebyUser,
    createIncomebyUser,
    deleteIncome,
    
    getOutcomebyUser,
    getTotalOutcomebyUser,
    createOutcomebyUser,
    deleteOutcome
} from '../controller/ActivityController.js';


const router = express.Router();

router.get('/getActivities/:id',getActivities)

router.get('/getIncomebyUser/:id',getIncomebyUser)
router.get('/getTotalIncomebyUser/:id',getTotalIncomebyUser)
router.post('/createIncomebyUser/:id',createIncomebyUser)
router.delete('/deleteIncome/:id',deleteIncome)

router.get('/getOutcomebyUser/:id',getOutcomebyUser)
router.get('/getTotalOutcomebyUser/:id',getTotalOutcomebyUser)
router.post('/createOutcomebyUser/:id',createOutcomebyUser)
router.delete('/deleteOutcome/:id',deleteOutcome)

export default router;