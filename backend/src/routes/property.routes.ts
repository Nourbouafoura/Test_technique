import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';

const router = Router();
const propertyController = new PropertyController();

router.get('/', propertyController.getAll);
router.get('/get/:id', propertyController.getById);
router.post('/create', propertyController.create);
router.put('/update/:id', propertyController.update);
router.delete('/delete/:id', propertyController.delete);

export default router;