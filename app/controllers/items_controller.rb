class ItemsController < ApplicationController
  skip_before_action :authenticate, only: [:show]

  def show
    @category = Category.find(params[:category_id])
    @item = @category.items.find(params[:id])
  end
  
  def new
    @category = Category.find(params[:category_id])
    @item = @category.items.new
  end

  def edit
    @category = Category.find(params[:category_id])
    @item = @category.items.find(params[:id])
  end

  def create
    @category = Category.find(params[:category_id])
    @item = @category.items.new(item_params)

    if @item.save
      redirect_to category_item_path(@category, @item)
    else
      render 'new'
    end
  end

  def update
    @category = Category.find(params[:category_id])
    @item = @category.items.find(params[:id])

    if @item.update(item_params)
      redirect_to category_item_path(@category, @item)
    else
      render 'edit'
    end
  end

  def destroy
    @category = Category.find(params[:category_id])
    @item = @category.items.find(params[:id])
    @item.destroy

    redirect_to categories_path
  end

  private

  def item_params
    params.require(:item).permit(:content)
  end
end
