class ItemsController < ApplicationController
  # TODO: Condense HTTP Digest authentication into one controller that will be inherited by ItemsController and CategoriesController
  USERS = { "john" => "1234" }

  before_action :authenticate, except: [:show]

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

  def authenticate
    authenticate_or_request_with_http_digest do |username|
      USERS[username]
    end
  end

  def item_params
    params.require(:item).permit(:content)
  end
end
