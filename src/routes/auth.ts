import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {User } from '../db';
import {authenticateJwt , SECRET}from '../middleware'; 

const router = Router();

// interface SignupRequestBody {
//     username: string;
//     email: string;
//     password: string;     
// }

// interface LoginRequestBody {
//     email: string;
//     password: string;
// }

const IPL_TEAMS = [
    'csk' , 
    'mi' , 
    'rcb' , 
    'kkr' , 
    'dc' , 
    'srh' , 
    'rr' , 
    'pxi'
  ];

router.post('/signup', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        const assignedTeam = IPL_TEAMS[Math.floor(Math.random()* IPL_TEAMS.length)]

        const newUser = new User({ username, email, password , team : assignedTeam});
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token , team : assignedTeam});
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in Successfully', token , team : user.team });
    } else {
        res.status(403).json({ message: 'Invalid email or password' });
    }
});

router.get('/me', authenticateJwt, async (req, res) => {
    const userId = req.headers["userId"] ; 
    const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username , team : user.team });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
});
        

router.post('/logout', authenticateJwt, (req: Request, res: Response) => {
    // Invalidate token (in a real scenario, you would use a token blacklist or other method)
    res.json({ message: 'Logged out successfully' });
});

// router.get('/products' , async(req,res)=>{
//     const products = await Product.find({}) ; 
//     res.json({products}) ; 
// })

// router.get('/product/:productId' , async(req , res)=>{
//     const productId = req.params.productId ;
//     const product = await Product.findById(productId) ; 
//     res.json({product}) ; 
// } )

export default router;
