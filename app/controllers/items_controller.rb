class ItemsController < ApplicationController
  def index
    @items = Item.all
  end

  def show
  end
  
  def new
  end

  def edit
  end

  def create
    @item = Item.new(params.require(:item).permit(:content))

    if @item.save
      redirect_to @item
    else
      render 'new'
    end
  end

  def update
  end

  def destroy
  end
end
