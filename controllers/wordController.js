const Word = require('./../models/wordModel');

exports.getAllWords = async (req, res) => {
  try {
    let filter = {};
    if (req.user.id) filter = { user: req.user.id };
    const words = await Word.find(filter);

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: words.length,
      data: {
        words,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getWord = async (req, res) => {
  console.log('getWord: ' + req.params.id);
  try {
    // const word = await Word.findById(req.params.id);
    // Word.findOne({ _id: req.params.id })
    const docs = await Word.find({
      user: req.user.id,
      word: { $regex: req.params.id, $options: 'i' },
    });

    res.status(200).json({
      status: 'success',
      data: {
        docs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createWord = async (req, res) => {
  try {
    // const newWord = new Word({})
    // newWord.save()
    if (!req.body.user) req.body.user = req.user.id; // id coming from protect middleware

    const newWord = await Word.create(req.body);
    //console.log(newWord);

    res.status(201).json({
      status: 'success',
      data: {
        word: newWord,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        word,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
