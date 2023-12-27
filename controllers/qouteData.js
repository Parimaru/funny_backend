const QuoteData = require('../schemas/QuoteData');

const getAll = async (req, res) => {
  try {
    const allQuoteData = await QuoteData.find({});
    if (!allQuoteData.length) {
      return res.status(404).json({ msg: 'No data found' });
    }
    res.status(200).json(allQuoteData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const quote_id = req.params.id;
    const oneQuoteData = await QuoteData.find({ _id: quote_id });
    console.log(oneQuoteData);
    if (!oneQuoteData.length) {
      return res.status(404).json({ msg: 'No data found' });
    }
    res.status(200).json(oneQuoteData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTop = async (req, res) => {
  try {
    const topQuoteData = await QuoteData.find().sort({ votes: -1 }).limit(10);

    if (!topQuoteData.length) {
      return res.status(404).json({ msg: 'No data found' });
    }
    res.status(200).json(topQuoteData);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const createNew = async (req, res) => {
  try {
    const { quote, fakeAuthor, originalAuthor, creator } = req.body;
    //Check if user filled out all the fields
    let emptyFields = [];
    if (!fakeAuthor) {
      emptyFields.push('fakeAuthor');
    }
    if (!creator) {
      emptyFields.push('creator');
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }
    const quoteData = await QuoteData.create({
      quote,
      fakeAuthor,
      originalAuthor,
      creator,
    });
    res.status(201).json({
      data: quoteData,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const vote = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFunny } = req.body;
    let quoteData;
    if (isFunny === true) {
      quoteData = await QuoteData.findByIdAndUpdate(
        id,
        {
          $inc: { funny: 1 },
        },
        {
          new: true,
        }
      );
    } else {
      quoteData = await QuoteData.findByIdAndUpdate(
        id,
        {
          $inc: { notfunny: 1 },
        },
        {
          new: true,
        }
      );
    }
    if (!quoteData) {
      res.status(404).json({ msg: "Quote to vote can't be found " });
    } else {
      res.status(200).json({ data: quoteData, msg: 'Voted successfully' });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = { createNew, getAll, getOne, vote, getTop };
