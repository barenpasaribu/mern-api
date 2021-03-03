import { validationResult } from "express-validator";
import path from "path";
import fs from "fs";
import Blog from "/models/blog";

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	const err = new Error("invalid value request");
	if (!errors.isEmpty()) {
		err.errorStatus = 422;
		err.data = errors.array();
		throw err;
	}

	if (!req.file) {
		const err = new Error("image must upload");
		err.errorStatus = 422;
		throw err;
	}

	const title = req.body.title;
	const image = req.file.path;
	const body = req.body.body;

	const Posting = new Blog({
		title,
		image,
		body,
		author: { uid: 1, name: "baren pasaribu" },
	});
	Posting.save()
		.then((result) => {
			res.status(200).json({
				message: "Create data success",
				data: result,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.getAllPosts = (req, res, next) => {
	Blog.find()
		.then((result) => {
			res.status(200).json({
				success: true,
				message: "Ok",
				data: result,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.getDataById = (req, res, next) => {
	let { id } = req.params;
	Blog.findOne({ _id: id })
		.then((data) => {
			if (!data) {
				const err = new Error("Data not found!");
				err.errorStatus = 404;
				throw err;
			}
			res.status(200).json({
				success: true,
				message: "Ok",
				data: data,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.updateDataById = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const err = new Error("invalid value request");
		err.errorStatus = 422;
		err.data = errors.array();
	}
	if (!req.file) {
		const err = new Error("image must upload");
		err.errorStatus = 422;
		throw err;
	}

	const title = req.body.title;
	const image = req.file.path;
	const body = req.body.body;

	const id = req.params.id;
	Blog.findById(id)
		.then((post) => {
			if (!post) {
				const err = new Error("Data not found");
				err.errorStatus = 404;
				throw err;
			}
			if (post.image) removeImage(post.image);

			post.title = title;
			post.image = image;
			post.body = body;
			return post.save();
		})
		.then((result) => {
			res.status(200).json({
				success: true,
				message: "Update data succesfully",
				data: result,
			});
		})
		.catch((err) => {
			next(err);
		});
};

exports.deleteData = (req, res, next) => {
	const id = req.params.id;

	Blog.findById(id)
		.then((post) => {
			if (!post) {
				const err = new Error("Data not found");
				err.errorStatus = 404;
				throw err;
			}
			removeImage(post.image);
			return Blog.findByIdAndRemove(id);
		})
		.then(() => {
			res.status(200).json({
				success: true,
				message: "Delete data succesfully",
			});
		})
		.catch((err) => {
			next(err);
		});
};

const removeImage = (filePath) => {
	console.log("filePath => ", filePath);
	console.log("dirName => ", __dirname);
	filePath = path.join(__dirname, "../../..", filePath);
	console.log("file path new =>", filePath);
	fs.unlink(filePath, (err) => console.log("err", err));
};
